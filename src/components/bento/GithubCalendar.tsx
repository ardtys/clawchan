import { Skeleton } from '@/components/ui/skeleton'
import { type FunctionComponent, useCallback, useEffect, useState } from 'react'
import Calendar, {
  type Props as ActivityCalendarProps,
} from 'react-activity-calendar'

// Adopted from https://github.com/grubersjoe/react-github-calendar
// Copyright (c) 2019 Jonathan Gruber, MIT License

interface Props extends Omit<ActivityCalendarProps, 'data' | 'theme'> {
  username: string
}

// Warm Gold gradient for Activity Log (Divine Theme)
const WARM_GOLD_THEME = {
  dark: [
    '#151518',  // Level 0 - Empty (dark background)
    '#5C4A2A',  // Level 1 - Darkest gold
    '#8B7340',  // Level 2
    '#D4A853',  // Level 3 - Main warm gold
    '#F5C463',  // Level 4 - Brightest gold/amber
  ],
}

async function fetchCalendarData(username: string): Promise<ApiResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  )
  const data: ApiResponse | ApiErrorResponse = await response.json()

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (data as ApiErrorResponse).error
      }`,
    )
  }

  return data as ApiResponse
}

const GithubCalendar: FunctionComponent<Props> = ({ username, ...props }) => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCalendarData(username)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [username])

  useEffect(fetchData, [fetchData])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="font-mono text-sm text-muted-foreground">
          <span className="text-destructive">ERROR:</span> Activity data unavailable
        </div>
      </div>
    )
  }

  if (loading || !data) {
    return <Skeleton className="size-full" />
  }

  return (
    <div className="flex size-full flex-col">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-2">
        <span className="font-mono text-xs text-warm-gold">
          ACTIVITY_LOG
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {data.total?.lastYear || Object.values(data.total)[0] || 0} events
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="[&_.react-activity-calendar\\_\\_legend-month]:text-foreground/80 hidden w-fit sm:block">
        <Calendar
          data={selectLastNDays(data.contributions, 133)}
          theme={WARM_GOLD_THEME}
          colorScheme="dark"
          blockSize={18}
          blockMargin={4}
          blockRadius={2}
          {...props}
          maxLevel={4}
          hideTotalCount
          hideColorLegend
        />
      </div>
      <div className="[&_.react-activity-calendar\\_\\_legend-month]:text-foreground/80 w-fit sm:hidden">
        <Calendar
          data={selectLastNDays(data.contributions, 60)}
          theme={WARM_GOLD_THEME}
          colorScheme="dark"
          blockSize={18}
          blockMargin={4}
          blockRadius={2}
          {...props}
          maxLevel={4}
          hideTotalCount
          hideColorLegend
        />
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1 px-2">
        <span className="font-mono text-xs text-muted-foreground">Less</span>
        {WARM_GOLD_THEME.dark.map((color, i) => (
          <div
            key={i}
            className="size-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="font-mono text-xs text-muted-foreground">More</span>
      </div>
    </div>
  )
}

interface Activity {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ApiResponse {
  total: {
    [year: number]: number
    [year: string]: number
  }
  contributions: Array<Activity>
}

interface ApiErrorResponse {
  error: string
}

const selectLastNDays = (contributions: Activity[], days: number) => {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - days)

  return contributions.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= startDate && activityDate <= today
  })
}

export default GithubCalendar
