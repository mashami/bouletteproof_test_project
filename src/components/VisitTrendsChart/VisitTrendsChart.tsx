"use client"

import { VisitorsType2 } from "@/utils/types"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface VisitTrendsChartProps {
  visitData: VisitorsType2[]
}

const VisitTrendsChart = ({ visitData }: VisitTrendsChartProps) => {
  // Extracting dates and page_views from visitData
  const dates = visitData.map((visitor) => visitor.dates) // X-axis labels (dates)
  const pageViews = visitData.map((visitor) => visitor.page_views) // Y-axis data (page views)

  // Prepare the data for the Bar chart
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Page Views",
        data: pageViews,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  }

  // Customize chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        title: {
          display: true,
          text: "Page Views",
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18
          }
        }
      }
    }
  }

  return (
    <div>
      <h2 className="text-[20px] font-ibm_plex_mono font-medium">
        Website Visit Trends
      </h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default VisitTrendsChart
