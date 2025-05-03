import styled from "styled-components"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--input);
  background-color: transparent;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &[data-state="checked"] {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
  }

  &:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px var(--ring) / 0.5;
  }

  &[aria-invalid] {
    border-color: var(--destructive);
    box-shadow: 0 0 0 3px var(--destructive) / 0.2;
  }

  &.dark[aria-invalid] {
    box-shadow: 0 0 0 3px var(--destructive) / 0.4;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  transition-property: none;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`
