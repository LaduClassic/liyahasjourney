import { Button } from '@/components/ui/button'
import { ArrowLeft, Lightning, Cards, GridFour, BookOpen } from '@phosphor-icons/react'
import { MathOperation, GameType } from '@/lib/types'
import { ActivityGrid, ActivityCardData } from '@/components/ActivityGrid'
import { ACTIVITY_COLORS } from '@/lib/colors'

interface GameSelectionProps {
  operation: MathOperation
  onSelectGame: (gameType: GameType) => void
  onBack?: () => void
}

export function GameSelection({ operation, onSelectGame, onBack }: GameSelectionProps) {
  const operationTitles: Record<MathOperation, string> = {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division'
  }

  const activities: ActivityCardData[] = []

  if (operation === 'multiplication') {
    activities.push({
      title: 'Times Table Chart',
      description: 'Explore patterns by highlighting',
      icon: <GridFour weight="fill" size={48} />,
      color: ACTIVITY_COLORS.orange,
      onClick: () => onSelectGame('multiplication-chart')
    })
  }

  activities.push(
    {
      title: 'Flashcards',
      description: 'Practice at your own pace',
      icon: <Cards weight="fill" size={48} />,
      color: ACTIVITY_COLORS.cyan,
      onClick: () => onSelectGame('flashcards')
    },
    {
      title: 'Speed Race',
      description: 'Answer as many as you can in 60 seconds!',
      icon: <Lightning weight="fill" size={48} />,
      color: ACTIVITY_COLORS.yellow,
      onClick: () => onSelectGame('racing')
    },
    {
      title: 'Word Problems',
      description: 'Solve story-based math adventures!',
      icon: <BookOpen weight="fill" size={48} />,
      color: ACTIVITY_COLORS.purple,
      onClick: () => onSelectGame('word-problems')
    }
  )

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        {onBack && (
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft size={24} />
              Back
            </Button>
            
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              {operationTitles[operation]}
            </h2>
            
            <div className="w-24" />
          </div>
        )}
        
        {!onBack && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              {operationTitles[operation]}
            </h2>
          </div>
        )}

        <ActivityGrid
          activities={activities}
          subtitle="Choose a game to play! 🎮"
        />
      </div>
    </div>
  )
}
