import { ReactNode } from 'react'
import { SectionHeader } from '@/components/SectionHeader'

interface SectionLayoutProps {
  title: string
  emoji?: string
  titleColor?: string
  onBack: () => void
  children: ReactNode
  maxWidth?: 'narrow' | 'default' | 'wide'
}

const maxWidthClasses = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl'
}

export function SectionLayout({ 
  title, 
  emoji, 
  titleColor, 
  onBack, 
  children,
  maxWidth = 'default'
}: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
        <SectionHeader
          title={title}
          emoji={emoji}
          titleColor={titleColor}
          onBack={onBack}
        />
        {children}
      </div>
    </div>
  )
}
