import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Lightning } from '@phosphor-icons/react'
import { MathOperation, Problem } from '@/lib/types'
import { generateProblem, formatProblem } from '@/lib/gameUtils'
import { Confetti } from '@/components/Confetti'
import { slideInRight } from '@/lib/animations'

interface RacingGameProps {
  operation: MathOperation
  onBack: () => void
  onSessionComplete: (score: number, total: number) => void
}

export function RacingGame({ operation, onBack, onSessionComplete }: RacingGameProps) {
  const [currentProblem, setCurrentProblem] = useState<Problem>(generateProblem(operation))
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          onSessionComplete(score, questionCount)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, questionCount, onSessionComplete])

  const checkAnswer = () => {
    const answer = parseInt(userAnswer)
    if (isNaN(answer)) return

    const isCorrect = answer === currentProblem.answer
    
    if (isCorrect) {
      setScore(score + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 500)
    }
    
    setQuestionCount(questionCount + 1)
    setCurrentProblem(generateProblem(operation))
    setUserAnswer('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer && gameActive) {
      checkAnswer()
    }
  }

  const progressPercentage = (timeLeft / 60) * 100

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Confetti show={showConfetti} />
      
      <div className="max-w-2xl mx-auto">
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
          
          <div className="flex items-center gap-3 text-2xl font-bold">
            <Lightning size={32} weight="fill" className="text-accent" />
            <span className="text-primary">Score: {score}</span>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Time Left</span>
              <span className={timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}>
                {timeLeft}s
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-4"
            />
          </div>
        </Card>

        {gameActive ? (
          <motion.div
            key={currentProblem.id}
            variants={slideInRight}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.2 }}
          >
            <Card className="p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="text-5xl md:text-7xl font-bold text-foreground">
                  {formatProblem(currentProblem)} = ?
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Quick!"
                    className="text-4xl md:text-5xl h-20 text-center font-bold"
                    autoFocus
                  />

                  <Button
                    size="lg"
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className="text-xl px-12 py-6 gap-3"
                  >
                    <Lightning size={28} weight="fill" />
                    Go!
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className="p-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Time's Up! ⏰
            </h2>
            <p className="text-2xl text-muted-foreground">
              You answered {score} out of {questionCount} correctly!
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
