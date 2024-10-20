"use client"
import { CustomersTable } from "@/components/CustomersTable"
import { VisitTrendsChart } from "@/components/VisitTrendsChart"

import { CustomerType, VisitorsType2 } from "@/utils/types"

interface DetailsPageWigetProps {
  visitors: VisitorsType2[]
  customers: CustomerType[]
}

const DetailsPageWidget = ({ visitors, customers }: DetailsPageWigetProps) => {
  return (
    <div className="space-y-8">
      <VisitTrendsChart visitData={visitors} />

      <CustomersTable customers={customers} />
    </div>
  )
}

export default DetailsPageWidget
