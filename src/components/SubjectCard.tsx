import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Subject } from '@/lib/types'
import { getStaggeredFadeInUp } from '@/lib/animations'

interface SubjectCardProps {
  subject: Subject
  title: string
  icon: React.ReactNode
  color: string
  onClick: () => void
  delay?: number
}

export function SubjectCard({ subject, title, icon, color, onClick, delay = 0 }: SubjectCardProps) {
  return (
    <motion.div
      {...getStaggeredFadeInUp(delay * 10)}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="relative overflow-hidden cursor-pointer h-48 flex flex-col items-center justify-center gap-4 p-6 transition-shadow hover:shadow-2xl"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        <div className="text-white text-6xl">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-white text-center">
          {title}
        </h2>
      </Card>
    </motion.div>
  )
}
