import { Pencil } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'

type EditIconButtonProps = ComponentProps<typeof Button>

const EditIconButton = ({
  variant = 'ghost',
  size = 'sm',
  ...props
}: EditIconButtonProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className="text-green-600 hover:text-green-800 hover:bg-blue-50"
    >
      <Pencil size={16} />
    </Button>
  )
}

export default EditIconButton
