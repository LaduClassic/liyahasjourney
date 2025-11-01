import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { House, Question, BookOpen, Flask, NumberSquareOne, Code } from '@phosphor-icons/react'
import { LettersQuiz } from '@/components/arabic/LettersQuiz'
import { QuizPrep } from '@/components/arabic/QuizPrep'
import { LetterReference } from '@/components/arabic/LetterReference'

interface ArabicSectionProps {
  onBack: () => void
}

export function ArabicSection({ onBack }: ArabicSectionProps) {
  const [showReference, setShowReference] = useState(false)
  const [showSubjectSelector, setShowSubjectSelector] = useState(false)

  const handleSubjectClick = () => {
    setShowSubjectSelector(false)
    onBack()
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 w-full">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowSubjectSelector(!showSubjectSelector)}
            className="gap-2 w-full sm:w-auto"
          >
            <House size={24} />
            <span>Subjects</span>
          </Button>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex-1 text-center" style={{ color: 'oklch(0.68 0.16 30)' }}>
            Liyah's Journey ✨
          </h2>
          
          <Button
            variant="default"
            size="lg"
            onClick={() => setShowReference(true)}
            className="gap-2 w-full sm:w-auto"
          >
            <Question size={24} weight="fill" />
            <span>Help</span>
          </Button>
        </div>

        {showSubjectSelector && (
          <Card className="mb-6 sm:mb-8 p-4 sm:p-6 w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Choose a Subject</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleSubjectClick}
                className="h-auto flex flex-col gap-2 py-4 sm:py-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200"
              >
                <NumberSquareOne size={32} className="sm:w-10 sm:h-10 text-purple-600" weight="fill" />
                <span className="text-sm sm:text-base md:text-lg font-bold">Math</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleSubjectClick}
                className="h-auto flex flex-col gap-2 py-4 sm:py-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200"
              >
                <Flask size={32} className="sm:w-10 sm:h-10 text-green-600" weight="fill" />
                <span className="text-sm sm:text-base md:text-lg font-bold">Science</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowSubjectSelector(false)}
                className="h-auto flex flex-col gap-2 py-4 sm:py-6 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200"
              >
                <BookOpen size={32} className="sm:w-10 sm:h-10 text-orange-600" weight="fill" />
                <span className="text-sm sm:text-base md:text-lg font-bold">Arabic</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleSubjectClick}
                className="h-auto flex flex-col gap-2 py-4 sm:py-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-200"
              >
                <Code size={32} className="sm:w-10 sm:h-10 text-blue-600" weight="fill" />
                <span className="text-sm sm:text-base md:text-lg font-bold">Coding</span>
              </Button>
            </div>
          </Card>
        )}

        {!showSubjectSelector && (
          <>
            <div className="mb-6 sm:mb-8 text-center px-4">
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                مرحبا! Let's learn Arabic! 🌙
              </p>
            </div>

            <Tabs defaultValue="letters" className="w-full">
              <div className="flex justify-center mb-6 sm:mb-8 px-2">
                <TabsList className="inline-flex gap-2 bg-muted/50 p-2 rounded-full w-full sm:w-auto max-w-md">
                  <TabsTrigger
                    value="letters"
                    className="rounded-full px-4 sm:px-6 py-2 font-bold text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground flex-1 sm:flex-initial"
                  >
                    Letters
                  </TabsTrigger>
                  <TabsTrigger
                    value="prep"
                    className="rounded-full px-4 sm:px-6 py-2 font-bold text-sm sm:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground flex-1 sm:flex-initial"
                  >
                    Quiz Prep
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="letters" className="mt-0 w-full">
                <LettersQuiz />
              </TabsContent>

              <TabsContent value="prep" className="mt-0 w-full">
                <QuizPrep />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <LetterReference
        open={showReference}
        onOpenChange={setShowReference}
      />
    </div>
  )
}
