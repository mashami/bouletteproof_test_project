import { VisitorsType2 } from "@/utils/types"
import HomePageWidget from "./HomePageWigdet"
// import { getAllVisitors } from "./services/services"
import { visitors } from "@/utils/data"

const page = async () => {
  // Fetch all visitors data
  // const visitorsArray: VisitorsType[] = await getAllVisitors()
  const visitorsArray: VisitorsType2[] = visitors
  // Merge all the data from multiple VisitorsType objects
  const mergedVisitors = visitorsArray.reduce(
    (acc, visitor) => {
      acc.page_views = acc.page_views.concat(visitor.page_views)
      acc.unique_visitors = acc.unique_visitors.concat(visitor.unique_visitors)
      acc.bounce_rate = acc.bounce_rate.concat(visitor.bounce_rate)
      acc.avg_session_duration = acc.avg_session_duration.concat(
        visitor.avg_session_duration
      )
      acc.dates = acc.dates.concat(visitor.dates)
      return acc
    },
    {
      page_views: [] as number[],
      unique_visitors: [] as number[],
      bounce_rate: [] as number[],
      avg_session_duration: [] as number[],
      dates: [] as string[]
    }
  )

  // Calculate total visitors (sum of all unique visitors)
  const totalVisitors = mergedVisitors.unique_visitors.reduce(
    (total, visitorsCount) => total + visitorsCount,
    0
  )

  // Calculate average bounce rate
  const bounceRate = (
    mergedVisitors.bounce_rate.reduce((total, rate) => total + rate, 0) /
    mergedVisitors.bounce_rate.length
  ).toFixed(2)

  // Calculate average session duration
  const averageDuration = (
    mergedVisitors.avg_session_duration.reduce(
      (total, duration) => total + duration,
      0
    ) / mergedVisitors.avg_session_duration.length
  ).toFixed(2)

  return (
    <div>
      <HomePageWidget
        avarageDuration={averageDuration}
        bounceRate={bounceRate}
        totalVisitors={totalVisitors.toString()}
      />
    </div>
  )
}

export default page
