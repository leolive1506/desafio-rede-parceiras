import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

function DebounceInput({
  className,
  debounceTime = 500,
  onDebouncedChange,
  ...props
}: React.ComponentProps<"input"> & { debounceTime?: number; onDebouncedChange: (value: string) => void }) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [debouncedValue, setDebouncedValue] = React.useState<string | undefined>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [inputValue, debounceTime]);

  React.useEffect(() => {
    if (debouncedValue !== undefined) {
      onDebouncedChange(debouncedValue)
    }

  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Input
      type="text"
      className={className}
      value={inputValue}
      onChange={handleChange}
      {...props}
    />
  );
}

export { Input, DebounceInput }
