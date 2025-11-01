import { useState } from 'react'
import { Planet, Drop, Atom, Flask } from '@phosphor-icons/react'
import { PeriodicTable } from '@/components/PeriodicTable'
import { WaterCycle } from '@/components/WaterCycle'
import { SolarSystem } from '@/components/SolarSystem'
import { SectionLayout } from '@/components/layouts/SectionLayout'
import { ActivityGrid, ActivityCardData } from '@/components/ActivityGrid'
import { SUBJECT_COLORS, ACTIVITY_COLORS } from '@/lib/colors'

interface ScienceSectionProps {
  onBack: () => void
}

type ScienceActivity = 'menu' | 'periodic-table' | 'water-cycle' | 'solar-system'

export function ScienceSection({ onBack }: ScienceSectionProps) {
  const [currentActivity, setCurrentActivity] = useState<ScienceActivity>('menu')

  if (currentActivity === 'periodic-table') {
    return <PeriodicTable onBack={() => setCurrentActivity('menu')} />
  }

  if (currentActivity === 'water-cycle') {
    return <WaterCycle onBack={() => setCurrentActivity('menu')} />
  }

  if (currentActivity === 'solar-system') {
    return <SolarSystem onBack={() => setCurrentActivity('menu')} />
  }

  const activities: ActivityCardData[] = [
    {
      title: 'Periodic Table',
      description: 'Discover amazing elements and their secrets!',
      icon: <Atom weight="fill" size={48} />,
      color: ACTIVITY_COLORS.purple,
      onClick: () => setCurrentActivity('periodic-table')
    },
    {
      title: 'Water Cycle',
      description: 'Learn how water travels around our world',
      icon: <Drop weight="fill" size={48} />,
      color: ACTIVITY_COLORS.cyan,
      onClick: () => setCurrentActivity('water-cycle')
    },
    {
      title: 'Solar System',
      description: 'Explore planets, stars, and space!',
      icon: <Planet weight="fill" size={48} />,
      color: ACTIVITY_COLORS.pink,
      onClick: () => setCurrentActivity('solar-system')
    },
    {
      title: 'Science Experiments',
      description: 'Coming soon: Fun experiments to try!',
      icon: <Flask weight="fill" size={48} />,
      color: ACTIVITY_COLORS.green,
      onClick: () => {},
      disabled: true
    }
  ]

  return (
    <SectionLayout
      title="Science Lab"
      emoji="🔬"
      onBack={onBack}
      titleColor={SUBJECT_COLORS.science}
    >
      <ActivityGrid
        activities={activities}
        subtitle="Explore the wonders of science! 🌟"
      />
    </SectionLayout>
  )
}
