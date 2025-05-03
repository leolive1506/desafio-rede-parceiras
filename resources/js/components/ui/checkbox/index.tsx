import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { StyledCheckbox, StyledIndicator } from "./styles"

function Checkbox(props: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <StyledCheckbox {...props}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  )
}

export { Checkbox }
