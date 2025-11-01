import { useState, useRef, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Eraser, Palette } from '@phosphor-icons/react'

interface MultiplicationChartProps {
  onBack: () => void
}

const COLORS = [
  { name: 'Pink', value: '#FF6B9D' },
  { name: 'Blue', value: '#4ECDC4' },
  { name: 'Yellow', value: '#FFD93D' },
  { name: 'Green', value: '#6BCB77' },
  { name: 'Purple', value: '#A076F9' },
  { name: 'Orange', value: '#FF8C42' }
]

export function MultiplicationChart({ onBack }: MultiplicationChartProps) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value)
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set())
  const [isDrawing, setIsDrawing] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  const getCellKey = (row: number, col: number) => `${row}-${col}`

  const handleCellInteraction = useCallback((row: number, col: number) => {
    const key = getCellKey(row, col)
    setHighlightedCells(prev => {
      const newSet = new Set(prev)
      if (!newSet.has(key)) {
        newSet.add(key)
      }
      return newSet
    })
  }, [])

  const handlePointerDown = (row: number, col: number) => {
    setIsDrawing(true)
    handleCellInteraction(row, col)
  }

  const handlePointerEnter = (row: number, col: number) => {
    if (isDrawing) {
      handleCellInteraction(row, col)
    }
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const clearChart = () => {
    setHighlightedCells(new Set())
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
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
          
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Multiplication Chart
          </h2>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="gap-2"
              >
                <Palette size={24} />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: selectedColor }}
                />
              </Button>
              
              {showColorPicker && (
                <Card className="absolute top-full right-0 mt-2 p-3 z-10 grid grid-cols-3 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setSelectedColor(color.value)
                        setShowColorPicker(false)
                      }}
                      title={color.name}
                    />
                  ))}
                </Card>
              )}
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={clearChart}
              className="gap-2"
            >
              <Eraser size={24} />
              Clear
            </Button>
          </div>
        </div>

        <Card className="p-2 md:p-6 overflow-x-auto">
          <div className="flex justify-center">
            <div
              ref={chartRef}
              className="select-none touch-none"
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div className="grid gap-0.5 md:gap-1" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-muted rounded flex items-center justify-center font-bold text-sm md:text-lg">
                  ×
                </div>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <div
                    key={`header-${num}`}
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-sm md:text-lg"
                  >
                    {num}
                  </div>
                ))}

                {Array.from({ length: 12 }, (_, row) => row + 1).map((rowNum) => (
                  <>
                    <div
                      key={`row-header-${rowNum}`}
                      className="w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-sm md:text-lg"
                    >
                      {rowNum}
                    </div>
                    {Array.from({ length: 12 }, (_, col) => col + 1).map((colNum) => {
                      const key = getCellKey(rowNum, colNum)
                      const isHighlighted = highlightedCells.has(key)
                      const product = rowNum * colNum

                      return (
                        <div
                          key={key}
                          className="w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 bg-card border border-border rounded flex items-center justify-center font-semibold text-xs sm:text-sm md:text-lg cursor-pointer transition-all active:scale-95"
                          style={{
                            backgroundColor: isHighlighted ? selectedColor : undefined,
                            color: isHighlighted ? 'white' : undefined
                          }}
                          onPointerDown={() => handlePointerDown(rowNum, colNum)}
                          onPointerEnter={() => handlePointerEnter(rowNum, colNum)}
                        >
                          {product}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-muted-foreground text-lg">
          <p>Drag your finger across the chart to highlight patterns! 🎨</p>
        </div>
      </div>
    </div>
  )
}
