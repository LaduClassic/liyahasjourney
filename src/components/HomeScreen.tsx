import { Calculator, Flask, Book, ChartBar, Code } from '@phosphor-icons/react'
import { SubjectCard } from '@/components/SubjectCard'
import { Button } from '@/components/ui/button'
import { Subject } from '@/lib/types'
import { SUBJECT_COLORS } from '@/lib/colors'

interface HomeScreenProps {
  onSelectSubject: (subject: Subject) => void
  onShowProgress: () => void
}

export function HomeScreen({ onSelectSubject, onShowProgress }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-2">
              Liyah's Journey
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Choose your adventure! 🚀
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={onShowProgress}
            className="gap-2"
          >
            <ChartBar size={24} />
            <span className="hidden md:inline">Progress</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <SubjectCard
            subject="math"
            title="Math Fun"
            icon={<Calculator weight="fill" />}
            color={SUBJECT_COLORS.math}
            onClick={() => onSelectSubject('math')}
            delay={0}
          />
          
          <SubjectCard
            subject="science"
            title="Science Lab"
            icon={<Flask weight="fill" />}
            color={SUBJECT_COLORS.science}
            onClick={() => onSelectSubject('science')}
            delay={0.1}
          />
          
          <SubjectCard
            subject="coding"
            title="Coding Fun"
            icon={<Code weight="fill" />}
            color={SUBJECT_COLORS.coding}
            onClick={() => onSelectSubject('coding')}
            delay={0.2}
          />
          
          <SubjectCard
            subject="arabic"
            title="Arabic Studies"
            icon={<Book weight="fill" />}
            color={SUBJECT_COLORS.arabic}
            onClick={() => onSelectSubject('arabic')}
            delay={0.3}
          />
        </div>
      </div>
    </div>
  )
}
