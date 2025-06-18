import React from 'react';
import { cn } from '../../utils/utils';

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm",
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children || 'Default Title'} {/* Fallback title text */}
    </h3>
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-slate-500", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
