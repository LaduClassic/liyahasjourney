import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface SectionHeaderProps {
  title: string
  onBack: () => void
  titleColor?: string
  emoji?: string
}

export function SectionHeader({ title, onBack, titleColor, emoji }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onBack}
        className="gap-2"
      >
        <ArrowLeft size={24} />
        Home
      </Button>
      
      <h2 className="text-4xl md:text-5xl font-bold" style={titleColor ? { color: titleColor } : undefined}>
        {title} {emoji}
      </h2>
      
      <div className="w-24" />
    </div>
  )
}
