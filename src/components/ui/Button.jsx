import React from 'react';
import { cn } from '../../utils/utils';

/**
 * Button component with different variants and sizes
 *
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Button style variant: 'default', 'outline', 'ghost', etc.
 * @param {string} [props.size='default'] - Button size: 'default', 'sm', 'lg', 'icon'
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.asChild=false] - Whether to render as a child element
 * @param {React.ComponentProps<'button'>} props.rest - Other button props
 */
const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? React.Fragment : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        // Variants
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'outline' && 'border border-slate-200 hover:bg-slate-100',
        variant === 'ghost' && 'hover:bg-slate-100',

        // Sizes
        size === 'default' && 'h-10 py-2 px-4',
        size === 'sm' && 'h-8 px-3 text-sm',
        size === 'lg' && 'h-12 px-8 text-lg',
        size === 'icon' && 'h-10 w-10',

        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };
