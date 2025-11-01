import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface SolarSystemProps {
  onBack: () => void
}

interface Planet {
  name: string
  color: string
  size: number
  distance: number
  fact: string
  emoji: string
}

const planets: Planet[] = [
  { 
    name: 'Mercury', 
    color: 'oklch(0.70 0.10 60)', 
    size: 20, 
    distance: 80,
    fact: 'The smallest planet and closest to the Sun! It\'s very hot during the day and freezing cold at night.',
    emoji: '🔥'
  },
  { 
    name: 'Venus', 
    color: 'oklch(0.75 0.15 80)', 
    size: 28, 
    distance: 120,
    fact: 'The hottest planet! It\'s covered in thick clouds of acid. It spins backwards compared to most planets!',
    emoji: '☁️'
  },
  { 
    name: 'Earth', 
    color: 'oklch(0.65 0.20 220)', 
    size: 30, 
    distance: 160,
    fact: 'Our home! The only planet with life. It has water, air, and the perfect temperature for living things.',
    emoji: '🌍'
  },
  { 
    name: 'Mars', 
    color: 'oklch(0.60 0.22 30)', 
    size: 24, 
    distance: 200,
    fact: 'The Red Planet! It has the biggest volcano in our solar system. Scientists think there might be water underground!',
    emoji: '🔴'
  },
  { 
    name: 'Jupiter', 
    color: 'oklch(0.70 0.15 50)', 
    size: 60, 
    distance: 280,
    fact: 'The biggest planet! It has a giant storm called the Great Red Spot that has been going for hundreds of years!',
    emoji: '🌪️'
  },
  { 
    name: 'Saturn', 
    color: 'oklch(0.75 0.12 70)', 
    size: 52, 
    distance: 360,
    fact: 'The planet with beautiful rings! The rings are made of ice and rocks. Saturn could float in water because it\'s so light!',
    emoji: '💍'
  },
  { 
    name: 'Uranus', 
    color: 'oklch(0.70 0.15 210)', 
    size: 40, 
    distance: 430,
    fact: 'The sideways planet! It spins on its side. It\'s so far from the Sun that it takes 84 Earth years to go around it once!',
    emoji: '🔵'
  },
  { 
    name: 'Neptune', 
    color: 'oklch(0.60 0.20 250)', 
    size: 38, 
    distance: 490,
    fact: 'The windiest planet! It has the strongest winds in the solar system. It\'s so far away that it takes 165 Earth years to orbit the Sun!',
    emoji: '💨'
  }
]

export function SolarSystem({ onBack }: SolarSystemProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
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
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.80 0.18 50)' }}>
            Solar System 🪐
          </h2>
          
          <div className="w-24" />
        </div>

        <p className="text-center text-xl text-muted-foreground mb-8">
          Click on any planet to learn about it! 🌟
        </p>

        <Card className="p-8 md:p-12 bg-gradient-to-b from-indigo-950 to-black overflow-x-auto">
          <div className="flex items-center gap-4 min-w-max">
            <motion.div
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div 
                className="rounded-full flex items-center justify-center text-3xl"
                style={{ 
                  width: '80px', 
                  height: '80px',
                  background: 'radial-gradient(circle, oklch(0.95 0.20 80) 0%, oklch(0.85 0.25 70) 100%)',
                  boxShadow: '0 0 40px oklch(0.85 0.25 70)'
                }}
              >
                ☀️
              </div>
              <div className="absolute -bottom-8 text-white text-sm font-bold whitespace-nowrap">
                The Sun
              </div>
            </motion.div>

            {planets.map((planet) => (
              <motion.div
                key={planet.name}
                className="relative flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPlanet(planet)}
                style={{ marginLeft: `${planet.distance - 80}px` }}
              >
                <div 
                  className="rounded-full"
                  style={{ 
                    width: `${planet.size}px`, 
                    height: `${planet.size}px`,
                    backgroundColor: planet.color,
                    boxShadow: `0 0 20px ${planet.color}`
                  }}
                />
                <div className="absolute -bottom-8 text-white text-xs font-bold whitespace-nowrap">
                  {planet.name}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedPlanet(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="p-8 max-w-md w-full">
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className="rounded-full"
                      style={{ 
                        width: `${selectedPlanet.size * 2}px`, 
                        height: `${selectedPlanet.size * 2}px`,
                        backgroundColor: selectedPlanet.color,
                        boxShadow: `0 0 30px ${selectedPlanet.color}`
                      }}
                    />
                  </div>
                  
                  <div className="text-center mb-4 text-4xl">
                    {selectedPlanet.emoji}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-center mb-4">
                    {selectedPlanet.name}
                  </h3>
                  
                  <div className="bg-accent/20 rounded-lg p-4 mb-4">
                    <p className="text-lg">
                      {selectedPlanet.fact}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedPlanet(null)}
                    className="w-full"
                    size="lg"
                  >
                    Close
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="mt-8 p-6 bg-accent/20">
          <h3 className="text-2xl font-bold mb-4 text-center">Amazing Fact! 🌟</h3>
          <p className="text-lg text-center">
            If the Sun was the size of a beach ball, Earth would be the size of a pea! Our solar system is HUGE! 🏖️
          </p>
        </Card>
      </div>
    </div>
  )
}
