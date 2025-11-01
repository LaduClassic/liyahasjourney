import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import { AnimatePresence } from 'framer-motion'
import { HomeScreen } from '@/components/HomeScreen'
import { MathSection } from '@/components/MathSection'
import { ScienceSection } from '@/components/ScienceSection'
import { ArabicSection } from '@/components/ArabicSection'
import { CodingSection } from '@/components/CodingSection'
import { ProgressDashboard } from '@/components/ProgressDashboard'
import { Subject, MathOperation, ProgressData, GameSession } from '@/lib/types'

type Screen = 'home' | 'math' | 'science' | 'arabic' | 'coding'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [showProgress, setShowProgress] = useState(false)
  const [progressData, setProgressData] = useKV<ProgressData>('progress-data', {
    totalSessions: 0,
    totalProblems: 0,
    totalCorrect: 0,
    overallAccuracy: 0,
    mathProgress: {
      addition: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
      subtraction: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
      multiplication: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
      division: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 }
    },
    scienceProgress: {
      completedActivities: 0,
      totalTime: 0
    },
    arabicProgress: {
      completedLessons: 0,
      totalTime: 0
    },
    recentSessions: [],
    lastActive: Date.now()
  })

  const handleSelectSubject = (subject: Subject) => {
    setCurrentScreen(subject as Screen)
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
  }

  const handleSessionComplete = (operation: MathOperation, score: number, total: number) => {
    const accuracy = total > 0 ? (score / total) * 100 : 0
    
    const session: GameSession = {
      id: `session-${Date.now()}`,
      subject: 'math',
      operation,
      gameType: 'flashcards',
      problems: [],
      score,
      totalQuestions: total,
      startTime: Date.now(),
      endTime: Date.now(),
      accuracy
    }

    setProgressData((currentData) => {
      if (!currentData) {
        return {
          totalSessions: 1,
          totalProblems: total,
          totalCorrect: score,
          overallAccuracy: accuracy,
          mathProgress: {
            addition: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
            subtraction: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
            multiplication: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
            division: { attempted: 0, correct: 0, accuracy: 0, averageTime: 0, lastPracticed: 0 },
            [operation]: { attempted: total, correct: score, accuracy, averageTime: 0, lastPracticed: Date.now() }
          },
          scienceProgress: { completedActivities: 0, totalTime: 0 },
          arabicProgress: { completedLessons: 0, totalTime: 0 },
          recentSessions: [session],
          lastActive: Date.now()
        }
      }

      const newData = { ...currentData }
      
      newData.totalSessions += 1
      newData.totalProblems += total
      newData.totalCorrect += score
      newData.overallAccuracy = (newData.totalCorrect / newData.totalProblems) * 100
      
      const opData = newData.mathProgress[operation]
      opData.attempted += total
      opData.correct += score
      opData.accuracy = (opData.correct / opData.attempted) * 100
      opData.lastPracticed = Date.now()
      
      newData.recentSessions = [session, ...newData.recentSessions].slice(0, 10)
      newData.lastActive = Date.now()
      
      return newData
    })

    if (accuracy >= 80) {
      toast.success('Amazing work! 🌟', {
        description: `You got ${score} out of ${total} correct!`
      })
    } else if (accuracy >= 60) {
      toast.success('Good job! 👏', {
        description: `You got ${score} out of ${total} correct. Keep practicing!`
      })
    } else {
      toast.success('Keep trying! 💪', {
        description: `You got ${score} out of ${total} correct. Practice makes perfect!`
      })
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      {currentScreen === 'home' && (
        <HomeScreen
          onSelectSubject={handleSelectSubject}
          onShowProgress={() => setShowProgress(true)}
        />
      )}

      {currentScreen === 'math' && (
        <MathSection
          onBack={handleBackToHome}
          onSessionComplete={handleSessionComplete}
        />
      )}

      {currentScreen === 'science' && (
        <ScienceSection onBack={handleBackToHome} />
      )}

      {currentScreen === 'coding' && (
        <CodingSection onBack={handleBackToHome} />
      )}

      {currentScreen === 'arabic' && (
        <ArabicSection onBack={handleBackToHome} />
      )}

      <AnimatePresence>
        {showProgress && progressData && (
          <ProgressDashboard
            progressData={progressData}
            onClose={() => setShowProgress(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
