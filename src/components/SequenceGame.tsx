import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SequenceGameProps {
  onBack: () => void
}

interface SequenceLevel {
  id: number
  title: string
  description: string
  steps: string[]
  correctOrder: number[]
}

const levels: SequenceLevel[] = [
  {
    id: 1,
    title: 'Making a Sandwich',
    description: 'Put the steps in the right order!',
    steps: [
      '🍞 Get two slices of bread',
      '🥜 Spread peanut butter',
      '🍇 Add jelly',
      '🍞 Put bread slices together',
      '🍽️ Enjoy your sandwich!'
    ],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 2,
    title: 'Getting Ready for School',
    description: 'What order should you do these?',
    steps: [
      '⏰ Wake up',
      '🦷 Brush teeth',
      '👕 Get dressed',
      '🥣 Eat breakfast',
      '🎒 Go to school'
    ],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 3,
    title: 'Planting a Seed',
    description: 'How does a plant grow?',
    steps: [
      '🌱 Plant the seed in soil',
      '💧 Water the seed',
      '☀️ Give it sunlight',
      '🌿 Watch it sprout',
      '🌸 The plant grows flowers!'
    ],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 4,
    title: 'Drawing a Picture',
    description: 'What comes first?',
    steps: [
      '📄 Get paper and crayons',
      '✏️ Draw the outline',
      '🎨 Color it in',
      '✨ Add details',
      '🖼️ Show your artwork!'
    ],
    correctOrder: [0, 1, 2, 3, 4]
  }
]

export function SequenceGame({ onBack }: SequenceGameProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [userOrder, setUserOrder] = useState<number[]>([])
  const [availableSteps, setAvailableSteps] = useState<number[]>(() => 
    Array.from({ length: levels[0].steps.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  )

  const level = levels[currentLevel]

  const addStep = (stepIndex: number) => {
    setUserOrder([...userOrder, stepIndex])
    setAvailableSteps(availableSteps.filter(i => i !== stepIndex))
  }

  const removeStep = (index: number) => {
    const stepIndex = userOrder[index]
    setUserOrder(userOrder.filter((_, i) => i !== index))
    setAvailableSteps([...availableSteps, stepIndex])
  }

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(level.correctOrder)
    
    if (isCorrect) {
      toast.success('Perfect! 🌟', {
        description: 'You got the sequence right!'
      })
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          const nextLevel = currentLevel + 1
          setCurrentLevel(nextLevel)
          setUserOrder([])
          setAvailableSteps(
            Array.from({ length: levels[nextLevel].steps.length }, (_, i) => i)
              .sort(() => Math.random() - 0.5)
          )
        } else {
          toast.success('You completed all levels! 🏆')
        }
      }, 1000)
    } else {
      toast.error('Not quite!', {
        description: 'Try putting the steps in a different order.'
      })
    }
  }

  const resetLevel = () => {
    setUserOrder([])
    setAvailableSteps(
      Array.from({ length: level.steps.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5)
    )
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
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.65 0.20 200)' }}>
            Step Sorter 🔢
          </h2>
          
          <div className="w-24" />
        </div>

        <div className="mb-6 text-center">
          <p className="text-xl mb-2">Level {level.id} of {levels.length}</p>
          <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
          <p className="text-lg text-muted-foreground">{level.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Available Steps</h3>
            <div className="space-y-3">
              {availableSteps.map((stepIndex) => (
                <motion.div
                  key={stepIndex}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => addStep(stepIndex)}
                    className="w-full h-auto p-4 text-left justify-start text-base"
                    variant="outline"
                  >
                    {level.steps[stepIndex]}
                  </Button>
                </motion.div>
              ))}
              {availableSteps.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  All steps have been placed! 👍
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Your Sequence</h3>
            <div className="space-y-3 mb-4">
              {userOrder.map((stepIndex, index) => (
                <motion.div
                  key={`${stepIndex}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => removeStep(index)}
                    className="w-full h-auto p-4 text-left justify-start text-base gap-3"
                    variant="secondary"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="flex-1">{level.steps[stepIndex]}</span>
                  </Button>
                </motion.div>
              ))}
              {userOrder.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Click steps from the left to build your sequence! ⬅️
                </p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={resetLevel}
            variant="outline"
            size="lg"
          >
            Reset
          </Button>
          <Button
            onClick={checkAnswer}
            disabled={userOrder.length !== level.steps.length}
            size="lg"
            className="gap-2"
          >
            <Check weight="bold" size={24} />
            Check Answer
          </Button>
        </div>

        <Card className="mt-6 p-6 bg-accent/20">
          <h3 className="text-lg font-bold mb-2 text-center">Tip 💡</h3>
          <p className="text-center">
            In coding, the order of steps (called "sequence") is very important! If steps are out of order, things won't work right.
          </p>
        </Card>
      </div>
    </div>
  )
}
