import { MathOperation, Problem } from './types'

export function generateProblem(operation: MathOperation, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): Problem {
  let num1: number, num2: number, answer: number
  
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 5, max: 20 },
    hard: { min: 10, max: 50 }
  }
  
  const { min, max } = ranges[difficulty]
  
  switch (operation) {
    case 'addition':
      num1 = Math.floor(Math.random() * (max - min + 1)) + min
      num2 = Math.floor(Math.random() * (max - min + 1)) + min
      answer = num1 + num2
      break
      
    case 'subtraction':
      num1 = Math.floor(Math.random() * (max - min + 1)) + min
      num2 = Math.floor(Math.random() * num1) + 1
      answer = num1 - num2
      break
      
    case 'multiplication':
      num1 = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 12 : 15)) + 1
      num2 = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 12 : 15)) + 1
      answer = num1 * num2
      break
      
    case 'division':
      num2 = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : 12)) + 1
      answer = Math.floor(Math.random() * (difficulty === 'easy' ? 10 : 12)) + 1
      num1 = num2 * answer
      break
      
    default:
      num1 = 0
      num2 = 0
      answer = 0
  }
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    operation,
    num1,
    num2,
    answer
  }
}

export function getOperationSymbol(operation: MathOperation): string {
  switch (operation) {
    case 'addition': return '+'
    case 'subtraction': return '−'
    case 'multiplication': return '×'
    case 'division': return '÷'
  }
}

export function formatProblem(problem: Problem): string {
  return `${problem.num1} ${getOperationSymbol(problem.operation)} ${problem.num2}`
}

export function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)]
}
