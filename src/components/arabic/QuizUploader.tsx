import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Gear, Upload, FileText } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { parseQuizFile, updateSpellingWords, DEFAULT_SPELLING_WORDS, SpellingWord } from '@/lib/arabicData'
import { useKV } from '@github/spark/hooks'

interface QuizUploaderProps {
  onWordsUpdated?: () => void
}

export function QuizUploader({ onWordsUpdated }: QuizUploaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customWords, setCustomWords] = useKV<SpellingWord[] | null>('arabic-custom-words', null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.txt')) {
      toast.error('Please upload a .txt file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      try {
        const words = parseQuizFile(content)
        if (words.length === 0) {
          toast.error('No valid words found in file')
          return
        }

        setCustomWords(words)
        updateSpellingWords(words)
        toast.success(`Loaded ${words.length} words successfully!`)
        onWordsUpdated?.()
        setIsOpen(false)
      } catch (err) {
        toast.error('Failed to parse quiz file')
        console.error(err)
      }
    }
    reader.readAsText(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleReset = () => {
    setCustomWords(null)
    updateSpellingWords(DEFAULT_SPELLING_WORDS)
    toast.success('Reset to default words')
    onWordsUpdated?.()
    setIsOpen(false)
  }

  const hasCustomWords = customWords !== null

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Gear size={24} weight="fill" />
        <span className="hidden sm:inline">Settings</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gear size={24} weight="fill" />
              Quiz Settings
            </DialogTitle>
            <DialogDescription>
              Upload a custom quiz file to replace the default words.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop a .txt file here, or click to browse
              </p>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileInput}
                className="hidden"
                id="quiz-file-input"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById('quiz-file-input')?.click()}
                className="gap-2"
              >
                <FileText size={20} />
                Choose File
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">File Format:</h4>
              <code className="text-xs block bg-background p-2 rounded">
                arabic|phonetic|definition
                <br />
                شَعْرٌ|sha-r|hair
                <br />
                بُنِّيٌّ|bun-nii-y|brown
              </code>
            </div>

            {hasCustomWords && (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Custom words are currently loaded.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="w-full"
                >
                  Reset to Default Words
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
