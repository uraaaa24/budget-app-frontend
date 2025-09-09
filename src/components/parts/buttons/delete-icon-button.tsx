import { Trash } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'

type DeleteIconButtonProps = ComponentProps<typeof Button>

const DeleteIconButton = ({
  variant = 'ghost',
  size = 'sm',
  ...props
}: DeleteIconButtonProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className="text-red-600 hover:text-red-800 hover:bg-red-50"
    >
      <Trash size={16} />
    </Button>
  )
}

export default DeleteIconButton
