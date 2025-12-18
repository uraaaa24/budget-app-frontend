export const OperatorTypes = {
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
} as const
type OperatorType = (typeof OperatorTypes)[keyof typeof OperatorTypes]

type OperatorProps = {
  type: OperatorType
}

const Operator = ({ type }: OperatorProps) => {
  return (
    <div
      className="flex h-32 flex-col items-center justify-between py-6"
      aria-hidden="true"
    >
      <div />
      <div className="text-3xl font-semibold text-gray-400 select-none">
        {type}
      </div>
    </div>
  )
}

export default Operator
