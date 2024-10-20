import { VisitorsType2 } from "@/utils/types"
import HomePageWidget from "./HomePageWigdet"
import { getAllVisitors } from "./services/services"

const page = async () => {
  // Fetch all visitors data
  // const visitorsArray: VisitorsType2[] = visitors
  const visitorsArray: VisitorsType2[] = await getAllVisitors()

  console.log("visitorsArray ===>", visitorsArray)

  // Parse the string data into numbers
  const parsedVisitorsArray = visitorsArray.map((visitor) => ({
    ...visitor,
    page_views: Number(visitor.page_views),
    unique_visitors: Number(visitor.unique_visitors),
    bounce_rate: Number(visitor.bounce_rate),
    avg_session_duration: Number(visitor.avg_session_duration)
  }))

  // Calculate total visitors (sum of all unique visitors)
  const totalVisitors = parsedVisitorsArray.reduce(
    (total, visitor) => total + visitor.unique_visitors,
    0
  )

  // Calculate average session duration
  const averageDuration = (
    parsedVisitorsArray.reduce(
      (total, visitor) => total + visitor.avg_session_duration,
      0
    ) / parsedVisitorsArray.length
  ).toFixed(2)

  // Calculate average bounce rate
  const bounceRate = (
    parsedVisitorsArray.reduce(
      (total, visitor) => total + visitor.bounce_rate,
      0
    ) / parsedVisitorsArray.length
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
