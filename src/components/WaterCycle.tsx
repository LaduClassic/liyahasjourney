import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Drop, Cloud, Sun, Snowflake } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface WaterCycleProps {
  onBack: () => void
}

export function WaterCycle({ onBack }: WaterCycleProps) {
  const [currentStage, setCurrentStage] = useState(0)

  const stages = [
    {
      name: 'Evaporation',
      icon: <Sun weight="fill" size={64} />,
      color: 'oklch(0.80 0.18 80)',
      description: 'The sun heats up water in rivers, lakes, and oceans. The water turns into water vapor (a gas) and rises into the air!',
      emoji: '☀️💧'
    },
    {
      name: 'Condensation',
      icon: <Cloud weight="fill" size={64} />,
      color: 'oklch(0.75 0.12 220)',
      description: 'As water vapor rises high in the sky, it cools down and turns back into tiny water droplets. These droplets form clouds!',
      emoji: '☁️'
    },
    {
      name: 'Precipitation',
      icon: <Drop weight="fill" size={64} />,
      color: 'oklch(0.70 0.18 240)',
      description: 'When the clouds get heavy with water droplets, they fall back to Earth as rain, snow, sleet, or hail!',
      emoji: '🌧️❄️'
    },
    {
      name: 'Collection',
      icon: <Snowflake weight="fill" size={64} />,
      color: 'oklch(0.65 0.20 200)',
      description: 'Water collects in rivers, lakes, and oceans. Then the cycle starts all over again!',
      emoji: '🌊'
    }
  ]

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else {
      setCurrentStage(0)
    }
  }

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
    } else {
      setCurrentStage(stages.length - 1)
    }
  }

  const stage = stages[currentStage]

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
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.70 0.18 200)' }}>
            Water Cycle 💧
          </h2>
          
          <div className="w-24" />
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-8">
            {stages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStage ? 'w-8 bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 md:p-12" style={{ backgroundColor: stage.color }}>
              <div className="text-center mb-6">
                <div className="text-white mb-4 flex justify-center">
                  {stage.icon}
                </div>
                <div className="text-4xl mb-4">{stage.emoji}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {stage.name}
                </h3>
                <p className="text-lg md:text-xl text-white/95">
                  {stage.description}
                </p>
              </div>
            </Card>
          </motion.div>

          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              size="lg"
              variant="outline"
            >
              ← Previous
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
            >
              {currentStage === stages.length - 1 ? 'Start Over' : 'Next →'}
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-accent/20">
          <h3 className="text-2xl font-bold mb-4 text-center">Fun Fact! 🌟</h3>
          <p className="text-lg text-center">
            The water you drink today could be the same water that dinosaurs drank millions of years ago! Water keeps recycling through the water cycle. 🦕💧
          </p>
        </Card>
      </div>
    </div>
  )
}
