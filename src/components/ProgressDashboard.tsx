import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { X, TrendUp, Trophy, Target, Clock } from '@phosphor-icons/react'
import { ProgressData, MathOperation } from '@/lib/types'

interface ProgressDashboardProps {
  progressData: ProgressData
  onClose: () => void
}

export function ProgressDashboard({ progressData, onClose }: ProgressDashboardProps) {
  const operationNames: Record<MathOperation, string> = {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-success'
    if (accuracy >= 70) return 'text-accent'
    return 'text-destructive'
  }

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-success'
    if (accuracy >= 70) return 'bg-accent'
    return 'bg-destructive'
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary">Learning Progress 📊</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={28} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-primary/10">
              <div className="flex items-start gap-3">
                <Trophy size={32} weight="fill" className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-3xl font-bold text-primary">{progressData.totalSessions}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-success/10">
              <div className="flex items-start gap-3">
                <Target size={32} weight="fill" className="text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                  <p className="text-3xl font-bold text-success">{progressData.totalCorrect}/{progressData.totalProblems}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/10">
              <div className="flex items-start gap-3">
                <TrendUp size={32} weight="fill" className="text-accent-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                  <p className={`text-3xl font-bold ${getAccuracyColor(progressData.overallAccuracy)}`}>
                    {progressData.overallAccuracy.toFixed(0)}%
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Math Skills Breakdown</h3>
            <div className="space-y-4">
              {(Object.entries(progressData.mathProgress) as [MathOperation, typeof progressData.mathProgress.addition][]).map(([operation, data]) => (
                <div key={operation} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{operationNames[operation]}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {data.correct}/{data.attempted} correct
                      </span>
                      <Badge className={getAccuracyColor(data.accuracy)}>
                        {data.accuracy.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={data.accuracy} 
                    className="h-3"
                  />
                  {data.lastPracticed > 0 && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={14} />
                      Last practiced: {formatDate(data.lastPracticed)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {progressData.recentSessions.length > 0 && (
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Recent Sessions</h3>
              <div className="space-y-3">
                {progressData.recentSessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {session.operation && operationNames[session.operation]} - {session.gameType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(session.startTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{session.score}/{session.totalQuestions}</p>
                      <p className={`text-sm ${getAccuracyColor(session.accuracy)}`}>
                        {session.accuracy.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6 bg-accent/10">
            <h3 className="text-xl font-bold mb-2 text-foreground">Recommendations 💡</h3>
            <ul className="space-y-2 text-muted-foreground">
              {progressData.mathProgress.multiplication.accuracy < 70 && (
                <li>• Focus on multiplication practice - try the Times Table Chart!</li>
              )}
              {progressData.mathProgress.division.attempted < 5 && (
                <li>• Explore division games to build confidence</li>
              )}
              {progressData.overallAccuracy >= 90 && (
                <li>• Excellent work! Try harder difficulty levels</li>
              )}
              {progressData.totalSessions >= 10 && (
                <li>• Great consistency! Keep up the daily practice</li>
              )}
            </ul>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
