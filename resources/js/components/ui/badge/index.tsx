import * as React from "react";
import { StyledBadge } from "./styles";

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { variant?: string; asChild?: boolean }) {
  if (!asChild) {
    return (
      <StyledBadge
        data-slot="badge"
        variant={variant ?? "default"}
        {...props}
      />
    )
  }

  return (
    <span
      data-slot="badge"
      {...props}
    />
  )
}

export { Badge }
