import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Robot, Lightbulb, Path, Code } from '@phosphor-icons/react'
import { SequenceGame } from '@/components/SequenceGame'
import { PatternMatcher } from '@/components/PatternMatcher'
import { RobotCommands } from '@/components/RobotCommands'
import { SectionLayout } from '@/components/layouts/SectionLayout'
import { ActivityGrid, ActivityCardData } from '@/components/ActivityGrid'
import { SUBJECT_COLORS, ACTIVITY_COLORS } from '@/lib/colors'

interface CodingSectionProps {
  onBack: () => void
}

type CodingActivity = 'menu' | 'sequence' | 'patterns' | 'robot'

export function CodingSection({ onBack }: CodingSectionProps) {
  const [currentActivity, setCurrentActivity] = useState<CodingActivity>('menu')

  if (currentActivity === 'sequence') {
    return <SequenceGame onBack={() => setCurrentActivity('menu')} />
  }

  if (currentActivity === 'patterns') {
    return <PatternMatcher onBack={() => setCurrentActivity('menu')} />
  }

  if (currentActivity === 'robot') {
    return <RobotCommands onBack={() => setCurrentActivity('menu')} />
  }

  const activities: ActivityCardData[] = [
    {
      title: 'Robot Commands',
      description: 'Guide the robot to the goal with code!',
      icon: <Robot weight="fill" size={48} />,
      color: ACTIVITY_COLORS.purple,
      onClick: () => setCurrentActivity('robot')
    },
    {
      title: 'Step Sorter',
      description: 'Put steps in the right order',
      icon: <Path weight="fill" size={48} />,
      color: ACTIVITY_COLORS.cyan,
      onClick: () => setCurrentActivity('sequence')
    },
    {
      title: 'Pattern Matcher',
      description: 'Find and complete the patterns',
      icon: <Lightbulb weight="fill" size={48} />,
      color: ACTIVITY_COLORS.yellow,
      onClick: () => setCurrentActivity('patterns')
    },
    {
      title: 'More Games',
      description: 'Coming soon: More coding adventures!',
      icon: <Code weight="fill" size={48} />,
      color: ACTIVITY_COLORS.green,
      onClick: () => {},
      disabled: true
    }
  ]

  return (
    <SectionLayout
      title="Coding Fun"
      emoji="💻"
      onBack={onBack}
      titleColor={SUBJECT_COLORS.coding}
    >
      <ActivityGrid
        activities={activities}
        subtitle="Learn to think like a programmer! 🚀"
      />

      <Card className="mt-8 p-6 bg-accent/20">
        <h3 className="text-2xl font-bold mb-4 text-center">What is Coding? 💡</h3>
        <p className="text-lg text-center">
          Coding is like giving instructions to a computer or robot. Just like following a recipe to bake cookies, computers need step-by-step instructions to do tasks! 🍪
        </p>
      </Card>
    </SectionLayout>
  )
}
