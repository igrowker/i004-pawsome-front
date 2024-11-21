
interface LegendProps {
  text: string
  className: string
}

const Legend = ({ text, className }: LegendProps) => {

  return <legend className={className}>{text}</legend>
}

export default Legend