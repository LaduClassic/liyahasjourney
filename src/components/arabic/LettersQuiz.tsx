import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ARABIC_LETTERS, type ArabicLetter } from '@/lib/arabicData'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

type QuizMode = 'form-to-name' | 'name-to-form'
type FormType = 'beginning' | 'middle' | 'final'

interface LettersQuizProps {
  onScoreUpdate?: (score: number, total: number) => void
}

export function LettersQuiz({ onScoreUpdate }: LettersQuizProps) {
  const [mode, setMode] = useState<QuizMode>('form-to-name')
  const [currentLetter, setCurrentLetter] = useState<ArabicLetter | null>(null)
  const [currentForm, setCurrentForm] = useState<FormType>('beginning')
  const [options, setOptions] = useState<ArabicLetter[]>([])
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [answered, setAnswered] = useState(false)

  const generateQuestion = () => {
    setAnswered(false)
    const letterIndex = Math.floor(Math.random() * ARABIC_LETTERS.length)
    const letter = ARABIC_LETTERS[letterIndex]
    const forms: FormType[] = ['beginning', 'middle', 'final']
    const randomForm = forms[Math.floor(Math.random() * forms.length)]

    const wrongOptions: ArabicLetter[] = []
    while (wrongOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * ARABIC_LETTERS.length)
      if (randomIndex !== letterIndex && !wrongOptions.includes(ARABIC_LETTERS[randomIndex])) {
        wrongOptions.push(ARABIC_LETTERS[randomIndex])
      }
    }

    const allOptions = [letter, ...wrongOptions]
    allOptions.sort(() => Math.random() - 0.5)

    setCurrentLetter(letter)
    setCurrentForm(randomForm)
    setOptions(allOptions)
  }

  useEffect(() => {
    if (ARABIC_LETTERS.length > 0) {
      generateQuestion()
    }
  }, [])

  const handleAnswer = (selectedLetter: ArabicLetter, isCorrect: boolean) => {
    if (answered) return

    setAnswered(true)
    const newTotal = total + 1
    setTotal(newTotal)

    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      toast.success('Amazing! 🌟', {
        description: 'You got it right!'
      })
      onScoreUpdate?.(newScore, newTotal)
    } else {
      toast.error('Try again! 💪', {
        description: `That was ${selectedLetter.name}, the correct answer is ${currentLetter?.name}`
      })
      onScoreUpdate?.(score, newTotal)
    }
  }

  const handleNext = () => {
    generateQuestion()
  }

  if (!currentLetter) return null

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
          Question
        </span>

        <div className="flex gap-2 p-1.5 bg-muted/50 rounded-full w-full sm:w-auto justify-center">
          <Button
            variant={mode === 'form-to-name' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setMode('form-to-name')
              setScore(0)
              setTotal(0)
              generateQuestion()
            }}
            className="rounded-full text-xs sm:text-sm flex-1 sm:flex-initial"
          >
            Form → Name
          </Button>
          <Button
            variant={mode === 'name-to-form' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setMode('name-to-form')
              setScore(0)
              setTotal(0)
              generateQuestion()
            }}
            className="rounded-full text-xs sm:text-sm flex-1 sm:flex-initial"
          >
            Name → Form
          </Button>
        </div>

        <div className="hidden sm:block flex-1" />
      </div>

      <Card className="p-4 sm:p-6 md:p-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLetter.name}-${currentForm}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            {mode === 'form-to-name' ? (
              <>
                <div
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center font-arabic"
                  style={{
                    fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                    direction: 'rtl'
                  }}
                >
                  {currentLetter.forms[currentForm]}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl text-primary text-center px-4">
                  Which letter is this <span className="font-semibold">{currentForm}</span> form?
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full mt-4">
                  {options.map((option) => {
                    const isCorrect = option.name === currentLetter.name
                    const showResult = answered

                    return (
                      <Button
                        key={option.name}
                        variant="outline"
                        size="lg"
                        onClick={() => handleAnswer(option, isCorrect)}
                        disabled={answered}
                        className={`h-auto py-3 sm:py-4 text-base sm:text-lg ${
                          showResult && isCorrect
                            ? 'bg-success/20 border-success hover:bg-success/20'
                            : showResult && !isCorrect
                            ? 'bg-destructive/20 border-destructive hover:bg-destructive/20'
                            : ''
                        }`}
                      >
                        {option.name}
                      </Button>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                  {currentLetter.name}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl text-primary text-center px-4">
                  Pick the <span className="font-semibold">{currentForm}</span> form
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mt-4">
                  {(['beginning', 'middle', 'final'] as FormType[]).map((formType) => {
                    const isCorrect = formType === currentForm
                    const showResult = answered

                    return (
                      <Button
                        key={formType}
                        variant="outline"
                        size="lg"
                        onClick={() =>
                          handleAnswer(
                            currentLetter,
                            isCorrect
                          )
                        }
                        disabled={answered}
                        className={`h-auto py-4 sm:py-6 flex flex-col gap-2 ${
                          showResult && isCorrect
                            ? 'bg-success/20 border-success hover:bg-success/20'
                            : showResult && !isCorrect
                            ? 'bg-destructive/20 border-destructive hover:bg-destructive/20'
                            : ''
                        }`}
                      >
                        <div
                          className="text-4xl sm:text-5xl font-arabic"
                          style={{
                            fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                            direction: 'rtl'
                          }}
                        >
                          {currentLetter.forms[formType]}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground capitalize">
                          {formType}
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <div className="px-4 sm:px-6 py-2 sm:py-3 bg-card rounded-full shadow-lg font-bold text-base sm:text-lg">
          {score} / {total}
        </div>
        <Button
          size="lg"
          onClick={handleNext}
          className="gap-2 rounded-full shadow-lg w-full sm:w-auto"
        >
          Next
          <span>▶</span>
        </Button>
      </div>
    </div>
  )
}
