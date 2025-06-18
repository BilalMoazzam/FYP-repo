import React from 'react';
import { cn } from '../../utils/utils';

const Table = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn("bg-slate-50 font-medium text-slate-900", className)}
      {...props}
    />
  );
});
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-100",
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-slate-500", className)}
      {...props}
    />
  );
});
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
