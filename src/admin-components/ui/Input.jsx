import * as React from "react";

const Input = React.forwardRef(
  ({ className, type, label, id, subtitle, ...props }, ref) => {
    return (
      <div className=" flex flex-col gap-1">
        {label ? (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none mb-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-start "
          >
            {label}
          </label>
        ) : null}

        <input
          type={type}
          id={id}
          className={`flex h-9 w-full rounded-md   px-3 py-1 text-sm shadow-sm transition-colors  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          name={id}
          {...props}
        />
        <p className=" text-start text-gray-800">{subtitle}</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
