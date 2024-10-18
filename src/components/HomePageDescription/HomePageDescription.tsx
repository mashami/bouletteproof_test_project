/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion"
interface DescriptionProps {
  svg: React.ReactNode
  header: string
  description: string
  number:string
}

const Description = ({ description, header, svg, number }: DescriptionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut"
      }}
      className="py-6 px-4 bg-white rounded-[32px] space-y-4 h-full"
    >
      {svg}
      <div className="space-y-4 text-left">
        <h4 className="text-3xl font-bricolage font-semibold">{header}</h4>
        <p className="font-light leading-6 text-black">{description}</p>
        <p className="font-bricolage pt-4 text-[50px] leading-6 text-black">{number}</p>

      </div>
    </motion.div>
  )
}

export default Description
