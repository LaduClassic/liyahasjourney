import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiProps {
  show: boolean
  onComplete?: () => void
}

export function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([])

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        color: ['#FFD700', '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360
      }))
      setParticles(newParticles)
      
      const timer = setTimeout(() => {
        setParticles([])
        onComplete?.()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: particle.color }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 1,
            rotate: particle.rotation 
          }}
          animate={{
            x: particle.x * 5,
            y: particle.y * 3,
            opacity: 0,
            rotate: particle.rotation + 360
          }}
          transition={{
            duration: 1.5,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}
