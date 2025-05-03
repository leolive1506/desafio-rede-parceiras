import styled from "styled-components"
import * as LabelPrimitive from "@radix-ui/react-label"

export const StyledLabel = styled(LabelPrimitive.Root)`
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 500;
  user-select: none;

  .group[data-disabled="true"] & {
    pointer-events: none;
    opacity: 0.5;
  }

  .peer:disabled + & {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
