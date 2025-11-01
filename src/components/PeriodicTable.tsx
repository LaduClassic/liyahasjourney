import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface PeriodicTableProps {
  onBack: () => void
}

interface Element {
  symbol: string
  name: string
  number: number
  category: 'alkali' | 'alkaline' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble' | 'lanthanide' | 'actinide'
  fact: string
}

const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', number: 1, category: 'nonmetal', fact: 'The most abundant element in the universe!' },
  { symbol: 'He', name: 'Helium', number: 2, category: 'noble', fact: 'Makes balloons float and your voice squeaky!' },
  { symbol: 'Li', name: 'Lithium', number: 3, category: 'alkali', fact: 'Used in phone and laptop batteries!' },
  { symbol: 'Be', name: 'Beryllium', number: 4, category: 'alkaline', fact: 'Found in emeralds and aquamarine gems!' },
  { symbol: 'B', name: 'Boron', number: 5, category: 'metalloid', fact: 'Helps make strong glass!' },
  { symbol: 'C', name: 'Carbon', number: 6, category: 'nonmetal', fact: 'Makes diamonds and is in all living things!' },
  { symbol: 'N', name: 'Nitrogen', number: 7, category: 'nonmetal', fact: 'Makes up 78% of the air we breathe!' },
  { symbol: 'O', name: 'Oxygen', number: 8, category: 'nonmetal', fact: 'We need it to breathe and live!' },
  { symbol: 'F', name: 'Fluorine', number: 9, category: 'halogen', fact: 'Keeps your teeth strong in toothpaste!' },
  { symbol: 'Ne', name: 'Neon', number: 10, category: 'noble', fact: 'Makes bright colorful signs glow!' },
  { symbol: 'Na', name: 'Sodium', number: 11, category: 'alkali', fact: 'Table salt is made with sodium!' },
  { symbol: 'Mg', name: 'Magnesium', number: 12, category: 'alkaline', fact: 'Burns with a super bright white light!' },
  { symbol: 'Al', name: 'Aluminum', number: 13, category: 'post-transition', fact: 'Used to make soda cans and foil!' },
  { symbol: 'Si', name: 'Silicon', number: 14, category: 'metalloid', fact: 'Computer chips are made from silicon!' },
  { symbol: 'P', name: 'Phosphorus', number: 15, category: 'nonmetal', fact: 'Glows in the dark and is in matches!' },
  { symbol: 'S', name: 'Sulfur', number: 16, category: 'nonmetal', fact: 'Gives rotten eggs their stinky smell!' },
  { symbol: 'Cl', name: 'Chlorine', number: 17, category: 'halogen', fact: 'Keeps swimming pools clean!' },
  { symbol: 'Ar', name: 'Argon', number: 18, category: 'noble', fact: 'Used in light bulbs to make them last longer!' },
  { symbol: 'K', name: 'Potassium', number: 19, category: 'alkali', fact: 'Found in bananas, good for your muscles!' },
  { symbol: 'Ca', name: 'Calcium', number: 20, category: 'alkaline', fact: 'Makes your bones and teeth strong!' }
]

const categoryColors: Record<Element['category'], string> = {
  alkali: 'oklch(0.75 0.18 30)',
  alkaline: 'oklch(0.75 0.18 60)',
  transition: 'oklch(0.70 0.15 200)',
  'post-transition': 'oklch(0.72 0.15 250)',
  metalloid: 'oklch(0.70 0.15 150)',
  nonmetal: 'oklch(0.75 0.18 100)',
  halogen: 'oklch(0.75 0.18 140)',
  noble: 'oklch(0.70 0.18 280)',
  lanthanide: 'oklch(0.72 0.15 320)',
  actinide: 'oklch(0.70 0.15 350)'
}

export function PeriodicTable({ onBack }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)

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
          
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'oklch(0.70 0.18 50)' }}>
            Periodic Table 🧪
          </h2>
          
          <div className="w-24" />
        </div>

        <p className="text-center text-xl text-muted-foreground mb-6">
          Click on any element to learn amazing facts! 🌟
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2 mb-8">
          {elements.map((element) => (
            <motion.div
              key={element.number}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer p-2 md:p-3 flex flex-col items-center justify-center aspect-square transition-shadow hover:shadow-xl"
                style={{ backgroundColor: categoryColors[element.category] }}
                onClick={() => setSelectedElement(element)}
              >
                <div className="text-[10px] md:text-xs text-white/80 font-medium">
                  {element.number}
                </div>
                <div className="text-lg md:text-2xl font-bold text-white">
                  {element.symbol}
                </div>
                <div className="text-[8px] md:text-xs text-white/90 text-center truncate w-full">
                  {element.name}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-4 md:p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-center">Element Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(categoryColors).slice(0, 8).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm capitalize">{category}</span>
              </div>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {selectedElement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedElement(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="p-8 max-w-md w-full">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className="w-24 h-24 rounded-xl flex flex-col items-center justify-center"
                      style={{ backgroundColor: categoryColors[selectedElement.category] }}
                    >
                      <div className="text-sm text-white/80 font-medium">
                        {selectedElement.number}
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {selectedElement.symbol}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-center mb-2">
                    {selectedElement.name}
                  </h3>
                  
                  <p className="text-lg text-center text-muted-foreground mb-4 capitalize">
                    {selectedElement.category}
                  </p>
                  
                  <div className="bg-accent/20 rounded-lg p-4 mb-4">
                    <p className="text-lg text-center">
                      {selectedElement.fact}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedElement(null)}
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
      </div>
    </div>
  )
}
