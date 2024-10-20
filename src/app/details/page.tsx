import { getCurrentUser } from "@/lib/session"
import { customers, visitors } from "@/utils/data"
import { CustomerType, VisitorsType2 } from "@/utils/types"
import { redirect } from "next/navigation"
import DetailsPageWiget from "./DetailsWidget"

const Detailspage = async () => {
  //Check if User is authenticate
  const user = await getCurrentUser()

  if (!user) {
    return redirect("/signin")
  }
  // const visitors:VisitorsType[] = await getAllVisitors()

  // const customers:CustomerType[] = await getAllCustomers()
  const visitorsData: VisitorsType2[] = visitors
  const customerData: CustomerType[] = customers
  return (
    <div className="md:pt-8 pt-16">
      <DetailsPageWiget visitors={visitorsData} customers={customerData} />
    </div>
  )
}

export default Detailspage
