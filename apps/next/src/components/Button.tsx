import { clsx } from "clsx";
import React from "react";

type Props = Omit<React.ComponentProps<"button">, "className"> & {};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={clsx(
        "inline-flex h-10 w-full select-none items-center justify-center rounded-md px-4 py-2 text-base font-medium",
        "border border-zinc-700 p-1 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400",
        "bg-white text-gray-700 dark:bg-zinc-800/40 dark:text-gray-100",
        "hover:bg-gray-50",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        // Register all radix states
        "group",
        "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
        "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
        "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50"
      )}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
