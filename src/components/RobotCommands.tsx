import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, ArrowLeft as ArrowLeftIcon, Play, Trash } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface RobotCommandsProps {
  onBack: () => void
}

type Direction = 'up' | 'down' | 'left' | 'right'
type GridCell = 'empty' | 'robot' | 'goal' | 'obstacle'

interface Level {
  id: number
  grid: GridCell[][]
  robotStart: { row: number; col: number }
  goalPos: { row: number; col: number }
  maxMoves: number
}

const levels: Level[] = [
  {
    id: 1,
    grid: [
      ['robot', 'empty', 'goal'],
      ['empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty']
    ],
    robotStart: { row: 0, col: 0 },
    goalPos: { row: 0, col: 2 },
    maxMoves: 3
  },
  {
    id: 2,
    grid: [
      ['robot', 'empty', 'empty'],
      ['empty', 'obstacle', 'empty'],
      ['empty', 'empty', 'goal']
    ],
    robotStart: { row: 0, col: 0 },
    goalPos: { row: 2, col: 2 },
    maxMoves: 5
  },
  {
    id: 3,
    grid: [
      ['robot', 'empty', 'obstacle', 'empty'],
      ['empty', 'obstacle', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'obstacle'],
      ['empty', 'empty', 'empty', 'goal']
    ],
    robotStart: { row: 0, col: 0 },
    goalPos: { row: 3, col: 3 },
    maxMoves: 8
  }
]

export function RobotCommands({ onBack }: RobotCommandsProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [commands, setCommands] = useState<Direction[]>([])
  const [robotPos, setRobotPos] = useState(levels[0].robotStart)
  const [isRunning, setIsRunning] = useState(false)

  const level = levels[currentLevel]

  const addCommand = (direction: Direction) => {
    if (commands.length < level.maxMoves) {
      setCommands([...commands, direction])
    }
  }

  const clearCommands = () => {
    setCommands([])
    setRobotPos(level.robotStart)
  }

  const runCommands = async () => {
    setIsRunning(true)
    let currentPos = { ...level.robotStart }
    setRobotPos(currentPos)

    for (const command of commands) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newPos = { ...currentPos }
      
      switch (command) {
        case 'up':
          newPos.row = Math.max(0, currentPos.row - 1)
          break
        case 'down':
          newPos.row = Math.min(level.grid.length - 1, currentPos.row + 1)
          break
        case 'left':
          newPos.col = Math.max(0, currentPos.col - 1)
          break
        case 'right':
          newPos.col = Math.min(level.grid[0].length - 1, currentPos.col + 1)
          break
      }

      if (level.grid[newPos.row][newPos.col] !== 'obstacle') {
        currentPos = newPos
        setRobotPos(currentPos)
      }
    }

    if (currentPos.row === level.goalPos.row && currentPos.col === level.goalPos.col) {
      toast.success('Amazing! You did it! 🎉', {
        description: 'The robot reached the goal!'
      })
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1)
          setCommands([])
          setRobotPos(levels[currentLevel + 1].robotStart)
        } else {
          toast.success('You completed all levels! 🏆')
        }
      }, 1000)
    } else {
      toast.error('Try again!', {
        description: 'The robot didn\'t reach the goal. Adjust your commands!'
      })
    }

    setIsRunning(false)
  }

  const commandIcons: Record<Direction, React.ReactElement> = {
    up: <ArrowUp weight="bold" size={24} />,
    down: <ArrowDown weight="bold" size={24} />,
    left: <ArrowLeftIcon weight="bold" size={24} />,
    right: <ArrowRight weight="bold" size={24} />
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
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.70 0.18 280)' }}>
            Robot Commands 🤖
          </h2>
          
          <div className="w-24" />
        </div>

        <div className="mb-6 text-center">
          <p className="text-xl mb-2">Level {level.id} of {levels.length}</p>
          <p className="text-lg text-muted-foreground">
            Guide the robot 🤖 to the goal 🎯 using {level.maxMoves} or fewer commands!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Game Board</h3>
            <div className="flex justify-center">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${level.grid[0].length}, 1fr)`
                }}
              >
                {level.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isRobot = robotPos.row === rowIndex && robotPos.col === colIndex
                    const isGoal = level.goalPos.row === rowIndex && level.goalPos.col === colIndex
                    const isObstacle = cell === 'obstacle'

                    return (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-3xl font-bold"
                        style={{
                          backgroundColor: isObstacle
                            ? 'oklch(0.40 0.05 280)'
                            : 'oklch(0.95 0.02 280)'
                        }}
                        animate={isRobot ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {isRobot ? '🤖' : isGoal ? '🎯' : ''}
                      </motion.div>
                    )
                  })
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Commands ({commands.length}/{level.maxMoves})
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button
                onClick={() => addCommand('up')}
                disabled={commands.length >= level.maxMoves || isRunning}
                size="lg"
                className="h-16"
              >
                <ArrowUp weight="bold" size={32} />
              </Button>
              <Button
                onClick={() => addCommand('down')}
                disabled={commands.length >= level.maxMoves || isRunning}
                size="lg"
                className="h-16"
              >
                <ArrowDown weight="bold" size={32} />
              </Button>
              <Button
                onClick={() => addCommand('left')}
                disabled={commands.length >= level.maxMoves || isRunning}
                size="lg"
                className="h-16"
              >
                <ArrowLeftIcon weight="bold" size={32} />
              </Button>
              <Button
                onClick={() => addCommand('right')}
                disabled={commands.length >= level.maxMoves || isRunning}
                size="lg"
                className="h-16"
              >
                <ArrowRight weight="bold" size={32} />
              </Button>
            </div>

            <div className="mb-4 p-4 bg-muted rounded-lg min-h-[80px]">
              <div className="flex flex-wrap gap-2">
                {commands.map((cmd, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-primary text-primary-foreground rounded flex items-center justify-center"
                  >
                    {commandIcons[cmd]}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={clearCommands}
                disabled={isRunning}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Trash size={24} />
                Clear
              </Button>
              <Button
                onClick={runCommands}
                disabled={commands.length === 0 || isRunning}
                size="lg"
                className="gap-2"
              >
                <Play weight="fill" size={24} />
                Run
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-accent/20">
          <h3 className="text-lg font-bold mb-2 text-center">Tip 💡</h3>
          <p className="text-center">
            Plan your path before adding commands. The robot can't move through gray obstacles!
          </p>
        </Card>
      </div>
    </div>
  )
}
