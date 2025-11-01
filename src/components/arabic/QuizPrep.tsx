import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SPELLING_WORDS, clusterArabic, normalizeArabic, updateSpellingWords, SpellingWord } from '@/lib/arabicData'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizUploader } from '@/components/arabic/QuizUploader'
import { useKV } from '@github/spark/hooks'

type PrepMode = 'flashcards' | 'letter-order' | 'phonetic-match' | 'definition-match' | 'write-it'

export function QuizPrep() {
  const [mode, setMode] = useState<PrepMode>('flashcards')
  const [wordIndex, setWordIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [customWords] = useKV<SpellingWord[] | null>('arabic-custom-words', null)

  useEffect(() => {
    if (customWords) {
      updateSpellingWords(customWords as any)
      setRefreshKey(prev => prev + 1)
    }
  }, [customWords])

  const handleWordsUpdated = () => {
    setRefreshKey(prev => prev + 1)
    setWordIndex(0)
  }

  const modes: Array<{ id: PrepMode; label: string }> = [
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'letter-order', label: 'Letter Order' },
    { id: 'phonetic-match', label: 'Phonetic Match' },
    { id: 'definition-match', label: 'Definition Match' },
    { id: 'write-it', label: 'Write It' }
  ]

  const descriptions: Record<PrepMode, string> = {
    'flashcards': 'Flip through the cards to review every word.',
    'letter-order': 'Arrange the Arabic letters in the correct order.',
    'phonetic-match': 'Match each Arabic word to the way it sounds.',
    'definition-match': 'Pair every Arabic word with its English meaning.',
    'write-it': 'Write the Arabic spelling from the pronunciation.'
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 w-full">
        <div className="flex-1 flex justify-center w-full overflow-x-auto">
          <div className="inline-flex flex-nowrap gap-2 p-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full shadow-lg">
            {modes.map(({ id, label }) => (
              <Button
                key={id}
                variant={mode === id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setMode(id)
                  setWordIndex(0)
                }}
                className={`rounded-full font-bold whitespace-nowrap text-xs sm:text-sm ${
                  mode === id ? 'shadow-lg' : ''
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-center sm:justify-end">
          <QuizUploader onWordsUpdated={handleWordsUpdated} />
        </div>
      </div>

      <p className="text-lg sm:text-xl md:text-2xl text-center text-muted-foreground px-4">
        {descriptions[mode]}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${refreshKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {mode === 'letter-order' && <LetterOrderMode wordIndex={wordIndex} setWordIndex={setWordIndex} />}
          {mode === 'phonetic-match' && <PhoneticMatchMode />}
          {mode === 'definition-match' && <DefinitionMatchMode />}
          {mode === 'write-it' && <WriteItMode wordIndex={wordIndex} setWordIndex={setWordIndex} />}
          {mode === 'flashcards' && <FlashcardsMode wordIndex={wordIndex} setWordIndex={setWordIndex} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function LetterOrderMode({ wordIndex, setWordIndex }: { wordIndex: number; setWordIndex: (i: number) => void }) {
  const word = SPELLING_WORDS[wordIndex]
  const clusters = clusterArabic(word.arabic)
  const [shuffled] = useState(() => [...clusters].sort(() => Math.random() - 0.5))
  const [slots, setSlots] = useState<string[]>([])
  const [used, setUsed] = useState<Set<number>>(new Set())

  const handleTileClick = (tile: string, tileIndex: number) => {
    if (used.has(tileIndex)) return

    const nextSlotIndex = slots.length
    if (nextSlotIndex >= clusters.length) return

    const shouldBe = clusters[nextSlotIndex]
    if (tile === shouldBe) {
      setSlots([...slots, tile])
      setUsed(new Set([...used, tileIndex]))

      if (nextSlotIndex === clusters.length - 1) {
        toast.success('Great job! ✔', {
          description: 'Assembled correctly!'
        })
      }
    } else {
      toast.error('Not quite!', {
        description: 'Try a different letter'
      })
    }
  }

  const handleReset = () => {
    setSlots([])
    setUsed(new Set())
  }

  const handlePrev = () => {
    setWordIndex((wordIndex - 1 + SPELLING_WORDS.length) % SPELLING_WORDS.length)
    handleReset()
  }

  const handleNext = () => {
    setWordIndex((wordIndex + 1) % SPELLING_WORDS.length)
    handleReset()
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8 w-full">
      <div className="flex flex-col gap-6">
        <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground">
          Word {wordIndex + 1} — select the letters in order
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center w-full" dir="rtl">
          {clusters.map((_, index) => (
            <div
              key={index}
              className={`w-14 h-16 sm:w-16 sm:h-20 md:min-w-[64px] md:min-h-[72px] border-2 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl ${
                slots[index]
                  ? 'border-primary bg-card border-solid'
                  : 'border-dashed border-muted bg-muted/20'
              }`}
              style={{
                fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif"
              }}
            >
              {slots[index] || ''}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center w-full" dir="rtl">
          {shuffled.map((cluster, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={() => handleTileClick(cluster, index)}
              disabled={used.has(index)}
              className={`min-w-[64px] sm:min-w-[80px] h-auto py-3 sm:py-4 text-2xl sm:text-3xl md:text-4xl border-2 ${
                used.has(index) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif"
              }}
            >
              {cluster}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap w-full">
          <Button onClick={handlePrev} className="flex-1 sm:flex-initial">Prev Word</Button>
          <Button onClick={handleNext} className="flex-1 sm:flex-initial">Next Word</Button>
          <Button variant="secondary" onClick={handleReset} className="flex-1 sm:flex-initial">
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}

function PhoneticMatchMode() {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [rightOrder] = useState(() =>
    SPELLING_WORDS.map((_, i) => i).sort(() => Math.random() - 0.5)
  )

  const tryMatch = (leftIndex: number | null, rightIndex: number | null) => {
    if (leftIndex === null || rightIndex === null) return

    if (leftIndex === rightIndex) {
      setMatched(new Set([...matched, leftIndex]))
      toast.success('Nice match! ✅')
      setSelectedLeft(null)
      setSelectedRight(null)

      if (matched.size + 1 === SPELLING_WORDS.length) {
        toast.success('All matched! Great work! 🎉')
      }
    } else {
      toast.error('Not a match, try again.')
      setSelectedLeft(null)
      setSelectedRight(null)
    }
  }

  const handleLeftClick = (index: number) => {
    if (matched.has(index)) return
    const newLeft = selectedLeft === index ? null : index
    setSelectedLeft(newLeft)
    if (selectedRight !== null) {
      setTimeout(() => tryMatch(newLeft, selectedRight), 100)
    }
  }

  const handleRightClick = (index: number) => {
    if (matched.has(index)) return
    const newRight = selectedRight === index ? null : index
    setSelectedRight(newRight)
    if (selectedLeft !== null) {
      setTimeout(() => tryMatch(selectedLeft, newRight), 100)
    }
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Words
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {SPELLING_WORDS.map((word, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                onClick={() => handleLeftClick(index)}
                disabled={matched.has(index)}
                className={`w-full text-xl sm:text-2xl h-auto py-3 sm:py-4 ${
                  matched.has(index)
                    ? 'bg-success/20 border-success'
                    : selectedLeft === index
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
                style={{
                  fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                  direction: 'rtl'
                }}
              >
                {word.arabic}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Phonetics
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {rightOrder.map((originalIndex) => (
              <Button
                key={originalIndex}
                variant="outline"
                size="lg"
                onClick={() => handleRightClick(originalIndex)}
                disabled={matched.has(originalIndex)}
                className={`w-full text-base sm:text-lg md:text-xl h-auto py-3 sm:py-4 font-mono ${
                  matched.has(originalIndex)
                    ? 'bg-success/20 border-success'
                    : selectedRight === originalIndex
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
              >
                {SPELLING_WORDS[originalIndex].phonetic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function DefinitionMatchMode() {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [rightOrder] = useState(() =>
    SPELLING_WORDS.map((_, i) => i).sort(() => Math.random() - 0.5)
  )

  const tryMatch = (leftIndex: number | null, rightIndex: number | null) => {
    if (leftIndex === null || rightIndex === null) return

    if (leftIndex === rightIndex) {
      setMatched(new Set([...matched, leftIndex]))
      toast.success('Great match! 🌟')
      setSelectedLeft(null)
      setSelectedRight(null)

      if (matched.size + 1 === SPELLING_WORDS.length) {
        toast.success('All meanings matched! Fantastic! 🎉')
      }
    } else {
      toast.error('Try matching again.')
      setSelectedLeft(null)
      setSelectedRight(null)
    }
  }

  const handleLeftClick = (index: number) => {
    if (matched.has(index)) return
    const newLeft = selectedLeft === index ? null : index
    setSelectedLeft(newLeft)
    if (selectedRight !== null) {
      setTimeout(() => tryMatch(newLeft, selectedRight), 100)
    }
  }

  const handleRightClick = (index: number) => {
    if (matched.has(index)) return
    const newRight = selectedRight === index ? null : index
    setSelectedRight(newRight)
    if (selectedLeft !== null) {
      setTimeout(() => tryMatch(selectedLeft, newRight), 100)
    }
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Arabic
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {SPELLING_WORDS.map((word, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                onClick={() => handleLeftClick(index)}
                disabled={matched.has(index)}
                className={`w-full text-xl sm:text-2xl h-auto py-3 sm:py-4 ${
                  matched.has(index)
                    ? 'bg-success/20 border-success'
                    : selectedLeft === index
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
                style={{
                  fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                  direction: 'rtl'
                }}
              >
                {word.arabic}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Definition
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {rightOrder.map((originalIndex) => (
              <Button
                key={originalIndex}
                variant="outline"
                size="lg"
                onClick={() => handleRightClick(originalIndex)}
                disabled={matched.has(originalIndex)}
                className={`w-full text-base sm:text-lg md:text-xl h-auto py-3 sm:py-4 ${
                  matched.has(originalIndex)
                    ? 'bg-success/20 border-success'
                    : selectedRight === originalIndex
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
              >
                {SPELLING_WORDS[originalIndex].definition}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function WriteItMode({ wordIndex, setWordIndex }: { wordIndex: number; setWordIndex: (i: number) => void }) {
  const word = SPELLING_WORDS[wordIndex]
  const [showTrace, setShowTrace] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      ctx.scale(dpr, dpr)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 3
      ctx.strokeStyle = 'oklch(0.60 0.19 250)'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [wordIndex])

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    
    let clientX: number, clientY: number

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      return null
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const startDrawing = (e: React.PointerEvent) => {
    e.preventDefault()
    const coords = getCoordinates(e)
    if (!coords) return

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    setHasDrawn(true)
    ctx.beginPath()
    ctx.moveTo(coords.x, coords.y)
  }

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing) return
    e.preventDefault()

    const coords = getCoordinates(e)
    if (!coords) return

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const handlePrev = () => {
    setWordIndex((wordIndex - 1 + SPELLING_WORDS.length) % SPELLING_WORDS.length)
    clearCanvas()
    setShowTrace(true)
  }

  const handleNext = () => {
    setWordIndex((wordIndex + 1) % SPELLING_WORDS.length)
    clearCanvas()
    setShowTrace(true)
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-center text-lg sm:text-xl font-mono text-primary font-bold">
            {word.phonetic}
          </p>
          <p className="text-center text-base sm:text-lg text-muted-foreground">
            {word.definition}
          </p>
        </div>

        <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-center flex-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wide font-semibold">
                Use your stylus to trace
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTrace(!showTrace)}
                className="text-xs"
              >
                {showTrace ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            <div 
              className="relative w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] bg-background rounded-xl border-2 border-dashed border-primary/30 overflow-hidden touch-none"
              dir="rtl"
            >
              {showTrace && (
                <div
                  className="absolute inset-0 flex justify-center items-center select-none pointer-events-none p-4"
                >
                  <div
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap"
                    style={{
                      fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                      color: 'oklch(0.60 0.19 250 / 0.25)',
                      textShadow: '0 0 1px oklch(0.60 0.19 250 / 0.4)',
                      WebkitTextStroke: '1px oklch(0.60 0.19 250 / 0.3)'
                    }}
                  >
                    {word.arabic}
                  </div>
                </div>
              )}
              
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                onPointerCancel={stopDrawing}
                style={{ touchAction: 'none' }}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                disabled={!hasDrawn}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap w-full">
          <Button onClick={handlePrev} className="flex-1 sm:flex-initial">Prev Word</Button>
          <Button onClick={handleNext} className="flex-1 sm:flex-initial">Next Word</Button>
        </div>
      </div>
    </Card>
  )
}

function FlashcardsMode({ wordIndex, setWordIndex }: { wordIndex: number; setWordIndex: (i: number) => void }) {
  const word = SPELLING_WORDS[wordIndex]
  const [revealed, setRevealed] = useState(false)

  const handlePrev = () => {
    setWordIndex((wordIndex - 1 + SPELLING_WORDS.length) % SPELLING_WORDS.length)
    setRevealed(false)
  }

  const handleNext = () => {
    setWordIndex((wordIndex + 1) % SPELLING_WORDS.length)
    setRevealed(false)
  }

  return (
    <Card className="p-6 sm:p-8 md:p-12 w-full">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div
          className="text-5xl sm:text-6xl md:text-7xl text-center break-words"
          style={{
            fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
            direction: 'rtl'
          }}
        >
          {word.arabic}
        </div>

        <div className="text-center flex flex-col gap-4">
          <Button variant="secondary" size="lg" onClick={() => setRevealed(!revealed)} className="w-full sm:w-auto">
            {revealed ? 'Hide' : 'Show'} phonetics
          </Button>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl font-mono text-primary"
            >
              {word.phonetic}
            </motion.div>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap w-full">
          <Button onClick={handlePrev} className="flex-1 sm:flex-initial">Prev</Button>
          <Button onClick={handleNext} className="flex-1 sm:flex-initial">Next</Button>
        </div>
      </div>
    </Card>
  )
}
