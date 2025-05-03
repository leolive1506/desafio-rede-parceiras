import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { StyledLabel } from "./styles"

function Label(props: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <StyledLabel {...props} />
}

export { Label }
