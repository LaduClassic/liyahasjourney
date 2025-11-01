export type Subject = 'math' | 'science' | 'arabic' | 'coding'

export type MathOperation = 'addition' | 'subtraction' | 'multiplication' | 'division'

export type GameType = 
  | 'flashcards' 
  | 'racing' 
  | 'multiplication-chart' 
  | 'matching'
  | 'word-problems'
  | 'quick-quiz'

export interface Problem {
  id: string
  operation: MathOperation
  num1: number
  num2: number
  answer: number
  userAnswer?: number
  correct?: boolean
  timestamp?: number
}

export interface GameSession {
  id: string
  subject: Subject
  operation?: MathOperation
  gameType: GameType
  problems: Problem[]
  score: number
  totalQuestions: number
  startTime: number
  endTime?: number
  accuracy: number
}

export interface ProgressData {
  totalSessions: number
  totalProblems: number
  totalCorrect: number
  overallAccuracy: number
  mathProgress: {
    addition: SubjectProgress
    subtraction: SubjectProgress
    multiplication: SubjectProgress
    division: SubjectProgress
  }
  scienceProgress: {
    completedActivities: number
    totalTime: number
  }
  arabicProgress: {
    completedLessons: number
    totalTime: number
  }
  recentSessions: GameSession[]
  lastActive: number
}

export interface SubjectProgress {
  attempted: number
  correct: number
  accuracy: number
  averageTime: number
  lastPracticed: number
}

export const ENCOURAGING_MESSAGES = {
  correct: [
    "Amazing! 🌟",
    "You're a star! ⭐",
    "Excellent work! 🎉",
    "Fantastic! 🎊",
    "Great job! 👏",
    "You got it! 💪",
    "Perfect! 🏆",
    "Wonderful! ✨",
    "Super work! 🚀",
    "Brilliant! 💎"
  ],
  tryAgain: [
    "Try again! 💪",
    "Almost there! 🌟",
    "Give it another go! 🔄",
    "You can do this! ⭐",
    "Keep trying! 🎯",
    "One more time! 💫",
    "Nice try! Keep going! 🌈",
    "Don't give up! 🦋"
  ]
}
