import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ARABIC_LETTERS, type ArabicLetter } from '@/lib/arabicData'
import { useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface LetterReferenceProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex?: number
}

export function LetterReference({ open, onOpenChange, initialIndex = 0 }: LetterReferenceProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const currentLetter = ARABIC_LETTERS[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ARABIC_LETTERS.length) % ARABIC_LETTERS.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ARABIC_LETTERS.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl bg-slate-900 text-white border-slate-700"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-widest uppercase text-white/80">
            Letter Reference
          </DialogTitle>
        </DialogHeader>

        <div className="relative py-8">
          <div className="bg-slate-950 rounded-3xl p-12 space-y-8">
            <h3 className="text-3xl font-bold text-center tracking-wide uppercase">
              {currentLetter.name}
            </h3>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-white/70 text-center">
                Letter Forms
              </h4>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { key: 'beginning' as const, label: 'Beginning' },
                  { key: 'middle' as const, label: 'Middle' },
                  { key: 'final' as const, label: 'Final' }
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="bg-white/5 rounded-2xl p-6 flex flex-col items-center gap-3"
                  >
                    <span className="text-xs uppercase tracking-wider text-white/70">
                      {label}
                    </span>
                    <div
                      className="text-7xl"
                      style={{
                        fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', 'Noto Kufi Arabic', 'Geeza Pro', 'Arial', sans-serif",
                        direction: 'rtl'
                      }}
                    >
                      {currentLetter.forms[key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-sm uppercase tracking-wider text-white/70">
                Romanization
              </h4>
              <p className="text-2xl font-mono text-amber-300">
                {currentLetter.romanization}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={handlePrevious}
          >
            <CaretLeft size={32} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={handleNext}
          >
            <CaretRight size={32} />
          </Button>
        </div>

        <div className="flex justify-center gap-2 flex-wrap max-h-24 overflow-y-auto pb-2">
          {ARABIC_LETTERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Go to letter ${index + 1}`}
            />
          ))}
        </div>

        <p className="text-xs text-center text-white/60 leading-relaxed">
          Tip: forms are generated using Arabic shaping with the tatweel "ـ" to force joins.
          <br />
          Beginning: <code className="text-amber-300">letter + ـ</code>, Middle:{' '}
          <code className="text-amber-300">ـ + letter + ـ</code>, Final:{' '}
          <code className="text-amber-300">ـ + letter</code>.
        </p>
      </DialogContent>
    </Dialog>
  )
}
