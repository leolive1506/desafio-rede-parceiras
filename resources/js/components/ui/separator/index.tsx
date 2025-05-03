import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { StyledSeparator } from "./styles"

function Separator({
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <StyledSeparator
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  )
}

export { Separator }
