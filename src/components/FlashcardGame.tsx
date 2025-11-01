import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check } from '@phosphor-icons/react'
import { MathOperation, Problem, ENCOURAGING_MESSAGES } from '@/lib/types'
import { generateProblem, formatProblem, getRandomMessage } from '@/lib/gameUtils'
import { Confetti } from '@/components/Confetti'
import { scaleIn } from '@/lib/animations'

interface FlashcardGameProps {
  operation: MathOperation
  onBack: () => void
  onSessionComplete: (score: number, total: number) => void
}

export function FlashcardGame({ operation, onBack, onSessionComplete }: FlashcardGameProps) {
  const [currentProblem, setCurrentProblem] = useState<Problem>(generateProblem(operation))
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [score, setScore] = useState(0)
  const [questionCount, setQuestionCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const totalQuestions = 10

  const checkAnswer = () => {
    const answer = parseInt(userAnswer)
    if (isNaN(answer)) return

    const isCorrect = answer === currentProblem.answer
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    
    if (isCorrect) {
      setScore(score + 1)
      setShowConfetti(true)
      setTimeout(() => {
        nextQuestion()
      }, 1500)
    } else {
      setAttempts(attempts + 1)
      if (attempts >= 2) {
        setTimeout(() => {
          nextQuestion()
        }, 2000)
      }
    }
  }

  const nextQuestion = () => {
    const nextCount = questionCount + 1
    if (nextCount >= totalQuestions) {
      onSessionComplete(score, totalQuestions)
    } else {
      setQuestionCount(nextCount)
      setCurrentProblem(generateProblem(operation))
      setUserAnswer('')
      setFeedback(null)
      setShowConfetti(false)
      setAttempts(0)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer && !feedback) {
      checkAnswer()
    }
  }

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
          
          <div className="text-xl font-bold text-muted-foreground">
            {questionCount + 1} / {totalQuestions}
          </div>
          
          <div className="text-xl font-bold text-primary">
            Score: {score}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentProblem.id}
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
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
                    placeholder="Your answer"
                    className="text-4xl md:text-5xl h-20 text-center font-bold"
                    disabled={feedback !== null}
                    autoFocus
                  />

                  {!feedback && (
                    <Button
                      size="lg"
                      onClick={checkAnswer}
                      disabled={!userAnswer}
                      className="text-xl px-12 py-6 gap-3"
                    >
                      <Check size={28} weight="bold" />
                      Check Answer
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`text-3xl md:text-4xl font-bold ${
                        feedback === 'correct' ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      {feedback === 'correct'
                        ? getRandomMessage(ENCOURAGING_MESSAGES.correct)
                        : attempts >= 2
                        ? `The answer was ${currentProblem.answer}. Keep practicing! 💪`
                        : getRandomMessage(ENCOURAGING_MESSAGES.tryAgain)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
