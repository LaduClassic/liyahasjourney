import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Lightbulb } from '@phosphor-icons/react'
import { MathOperation } from '@/lib/types'

interface WordProblem {
  story: string
  question: string
  answer: number
  options: number[]
  hint: string
  operation: MathOperation
}

interface WordProblemsGameProps {
  operation: MathOperation
  onBack: () => void
  onSessionComplete: (score: number, total: number) => void
}

const allProblems: WordProblem[] = [
  {
    story: "Our hero found 12 magic coins in a treasure chest. Then they found 8 more coins under a rock.",
    question: "How many coins does the hero have?",
    answer: 20,
    options: [18, 20, 22, 16],
    hint: "This is an addition problem. Add the coins together.",
    operation: 'addition'
  },
  {
    story: "The wizard collected 25 magical stars in the sky. Then they collected 15 more shining stars.",
    question: "How many stars does the wizard have in total?",
    answer: 40,
    options: [35, 40, 45, 38],
    hint: "Add the first group of stars with the second group.",
    operation: 'addition'
  },
  {
    story: "A fairy found 17 flowers in the morning. In the afternoon, she found 23 more beautiful flowers.",
    question: "How many flowers does the fairy have?",
    answer: 40,
    options: [38, 40, 42, 36],
    hint: "Add both groups of flowers together.",
    operation: 'addition'
  },
  {
    story: "The dragon has 35 fireballs. Our hero uses 17 fireballs to create a shield.",
    question: "How many fireballs does the dragon have left?",
    answer: 18,
    options: [16, 18, 20, 22],
    hint: "This is a subtraction problem. Subtract the used fireballs from the total.",
    operation: 'subtraction'
  },
  {
    story: "A knight had 50 golden arrows. He used 28 arrows during a battle.",
    question: "How many arrows does the knight have left?",
    answer: 22,
    options: [20, 22, 24, 18],
    hint: "Subtract the arrows used from the total arrows.",
    operation: 'subtraction'
  },
  {
    story: "The princess had 42 precious jewels. She gave away 19 jewels to help the villagers.",
    question: "How many jewels does the princess have now?",
    answer: 23,
    options: [21, 23, 25, 27],
    hint: "Subtract the jewels given away from the original amount.",
    operation: 'subtraction'
  },
  {
    story: "There are 4 groups of 6 magical butterflies in the enchanted garden.",
    question: "How many butterflies are there?",
    answer: 24,
    options: [20, 22, 24, 26],
    hint: "This is a multiplication problem. Multiply the number of groups by the number in each group.",
    operation: 'multiplication'
  },
  {
    story: "A dragon's cave has 8 chambers. Each chamber contains 5 treasure chests.",
    question: "How many treasure chests are there?",
    answer: 40,
    options: [32, 36, 40, 44],
    hint: "Multiply the number of chambers by the number of chests per chamber.",
    operation: 'multiplication'
  },
  {
    story: "The wizard created 7 potions. Each potion needs 9 magical herbs.",
    question: "How many herbs does the wizard need in total?",
    answer: 63,
    options: [56, 63, 70, 54],
    hint: "Multiply the number of potions by herbs needed per potion.",
    operation: 'multiplication'
  },
  {
    story: "The hero collected 36 gems and wants to share them equally among 6 friends.",
    question: "How many gems does each friend get?",
    answer: 6,
    options: [4, 6, 8, 10],
    hint: "This is a division problem. Divide the total gems by the number of friends.",
    operation: 'division'
  },
  {
    story: "The hero has 48 gold coins and wants to distribute them equally into 8 bags.",
    question: "How many coins go in each bag?",
    answer: 6,
    options: [5, 6, 7, 8],
    hint: "Divide the total coins by the number of bags.",
    operation: 'division'
  },
  {
    story: "A baker made 56 magical cookies to share equally with 7 elves.",
    question: "How many cookies does each elf get?",
    answer: 8,
    options: [6, 7, 8, 9],
    hint: "Divide the total cookies by the number of elves.",
    operation: 'division'
  }
]

export function WordProblemsGame({ operation, onBack, onSessionComplete }: WordProblemsGameProps) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gems, setGems] = useState(0)
  const [problemsSolved, setProblemsSolved] = useState(0)
  const [level, setLevel] = useState(1)
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean | null }>({ message: '', isCorrect: null })
  const [showHint, setShowHint] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const filteredProblems = allProblems.filter(p => p.operation === operation)
  const problems = filteredProblems.length > 0 ? filteredProblems : allProblems
  const currentProblem = problems[currentProblemIndex]
  const progress = (problemsSolved / problems.length) * 100

  const [shuffledOptions, setShuffledOptions] = useState<number[]>([])

  useEffect(() => {
    setShuffledOptions([...currentProblem.options].sort(() => Math.random() - 0.5))
    setShowHint(false)
    setFeedback({ message: '', isCorrect: null })
    setSelectedAnswer(null)
    setIsAnswered(false)
  }, [currentProblemIndex, currentProblem.options])

  const checkAnswer = (selected: number) => {
    if (isAnswered) return
    
    setSelectedAnswer(selected)
    setIsAnswered(true)
    
    if (selected === currentProblem.answer) {
      setFeedback({ message: "Correct! Well done! 🎉", isCorrect: true })
      setScore(prev => prev + 10)
      setGems(prev => prev + 1)
      setProblemsSolved(prev => prev + 1)
      
      if ((problemsSolved + 1) % 3 === 0) {
        setLevel(prev => prev + 1)
      }
    } else {
      setFeedback({ 
        message: `Oops! The correct answer is ${currentProblem.answer}. Try again!`, 
        isCorrect: false 
      })
    }
  }

  const nextProblem = () => {
    if (currentProblemIndex === problems.length - 1) {
      onSessionComplete(score, problemsSolved)
      onBack()
    } else {
      setCurrentProblemIndex((currentProblemIndex + 1) % problems.length)
    }
  }

  const handleHint = () => {
    setShowHint(true)
  }

  const character = operation === 'addition' ? '🧙‍♂️' : 
                   operation === 'subtraction' ? '⚔️' :
                   operation === 'multiplication' ? '🦋' : '👑'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-2xl">
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
              
              <div className="text-right">
                <div className="text-lg md:text-xl font-bold text-destructive">
                  Level: {level}
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-5xl font-bold text-destructive mb-2">
                Math Adventure Quest
              </h1>
              <p className="text-lg md:text-xl text-primary">
                Solve word problems to help our hero save the kingdom!
              </p>
            </div>

            <div className="text-center text-6xl md:text-8xl my-6">
              {character}
            </div>

            <Progress value={progress} className="h-4 mb-6" />

            <Card className="bg-accent/20 p-6 mb-6 min-h-[180px] flex items-center">
              <div className="text-left">
                <p className="text-lg md:text-xl leading-relaxed mb-4">
                  {currentProblem.story}
                </p>
                <p className="text-xl md:text-2xl font-bold text-destructive">
                  {currentProblem.question}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {shuffledOptions.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => checkAnswer(option)}
                    disabled={isAnswered}
                    className={`w-full h-16 text-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg ${
                      selectedAnswer === option
                        ? selectedAnswer === currentProblem.answer
                          ? 'ring-4 ring-success'
                          : 'ring-4 ring-destructive'
                        : ''
                    }`}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`p-4 mb-6 text-center text-lg md:text-xl font-bold ${
                      feedback.isCorrect 
                        ? 'bg-success/20 text-success border-success' 
                        : 'bg-destructive/20 text-destructive border-destructive'
                    }`}
                  >
                    {feedback.message}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 mb-6 bg-muted/50 text-center text-lg">
                  <strong>Hint:</strong> {currentProblem.hint}
                </Card>
              </motion.div>
            )}

            <Card className="bg-primary text-white p-4 mb-6">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-sm opacity-90">Score</div>
                  <div className="text-2xl font-bold">{score}</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Gems Collected</div>
                  <div className="text-2xl font-bold">{gems} 💎</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Problems</div>
                  <div className="text-2xl font-bold">{problemsSolved}</div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={nextProblem}
                size="lg"
                className="bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-white text-lg px-8 py-6"
              >
                {currentProblemIndex === problems.length - 1 ? 'Finish' : 'Next Problem'}
              </Button>
              <Button
                onClick={handleHint}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 gap-2"
              >
                <Lightbulb size={24} weight="fill" />
                Show Hint
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
