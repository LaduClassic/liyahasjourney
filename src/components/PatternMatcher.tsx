import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface PatternMatcherProps {
  onBack: () => void
}

type PatternItem = string

interface PatternLevel {
  id: number
  title: string
  pattern: PatternItem[]
  options: PatternItem[]
  correctAnswer: PatternItem
}

const shapes = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠', '⭐', '❤️', '💎', '🌟']

const generateLevels = (): PatternLevel[] => {
  return [
    {
      id: 1,
      title: 'Simple Repeat',
      pattern: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'],
      options: ['🔵', '🔴', '🟡', '🟢'],
      correctAnswer: '🔵'
    },
    {
      id: 2,
      title: 'Three Pattern',
      pattern: ['⭐', '❤️', '💎', '⭐', '❤️', '?'],
      options: ['💎', '⭐', '❤️', '🌟'],
      correctAnswer: '💎'
    },
    {
      id: 3,
      title: 'Growing Pattern',
      pattern: ['🔴', '🔴', '🔵', '🔴', '🔴', '?'],
      options: ['🔴', '🔵', '🟡', '🟢'],
      correctAnswer: '🔵'
    },
    {
      id: 4,
      title: 'Rainbow Sequence',
      pattern: ['🔴', '🟠', '🟡', '🟢', '🔵', '?'],
      options: ['🟣', '🔴', '🟡', '🟢'],
      correctAnswer: '🟣'
    },
    {
      id: 5,
      title: 'Double Up',
      pattern: ['⭐', '⭐', '❤️', '❤️', '💎', '?'],
      options: ['💎', '⭐', '❤️', '🌟'],
      correctAnswer: '💎'
    }
  ]
}

export function PatternMatcher({ onBack }: PatternMatcherProps) {
  const [levels] = useState(generateLevels())
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<PatternItem | null>(null)

  const level = levels[currentLevel]

  const checkAnswer = () => {
    if (!selectedAnswer) {
      toast.error('Select an answer first!')
      return
    }

    if (selectedAnswer === level.correctAnswer) {
      toast.success('Correct! 🎉', {
        description: 'You found the pattern!'
      })
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1)
          setSelectedAnswer(null)
        } else {
          toast.success('You completed all patterns! 🏆')
        }
      }, 1000)
    } else {
      toast.error('Not quite!', {
        description: 'Look at the pattern more carefully.'
      })
      setSelectedAnswer(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft size={24} />
            Back
          </Button>
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.70 0.18 50)' }}>
            Pattern Matcher 🎨
          </h2>
          
          <div className="w-24" />
        </div>

        <div className="mb-6 text-center">
          <p className="text-xl mb-2">Level {level.id} of {levels.length}</p>
          <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
          <p className="text-lg text-muted-foreground">What comes next in the pattern?</p>
        </div>

        <Card className="p-8 mb-6">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {level.pattern.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-xl flex items-center justify-center text-4xl md:text-5xl"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4 text-center">Choose the next shape:</h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {level.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAnswer(option)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-4xl md:text-5xl transition-all ${
                  selectedAnswer === option
                    ? 'bg-primary ring-4 ring-primary/50'
                    : 'bg-card border-2 border-border hover:border-primary'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <Button
            onClick={checkAnswer}
            disabled={!selectedAnswer}
            size="lg"
            className="w-full"
          >
            Check Answer
          </Button>
        </Card>

        <Card className="p-6 bg-accent/20">
          <h3 className="text-lg font-bold mb-2 text-center">About Patterns 💡</h3>
          <p className="text-center">
            In coding, recognizing patterns helps us write better programs! Patterns repeat in a predictable way, just like in music, art, and nature. 🎵🎨🌿
          </p>
        </Card>
      </div>
    </div>
  )
}
