import styled from "styled-components"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

export const StyledContent = styled(DropdownMenuPrimitive.Content)`
  background-color: var(--popover);
  color: var(--popover-foreground);
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  padding: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;

  &[data-state="open"] {
    animation: fadeIn 0.1s ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 0.1s ease-out;
  }

  &[data-side="bottom"] {
    animation-name: slideUp;
  }

  &[data-side="left"] {
    animation-name: slideRight;
  }

  &[data-side="right"] {
    animation-name: slideLeft;
  }

  &[data-side="top"] {
    animation-name: slideDown;
  }
`

export const StyledItem = styled(DropdownMenuPrimitive.Item)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;

  &[data-inset] {
    padding-left: 2rem;
  }

  &[data-variant="destructive"] {
    color: var(--destructive-foreground);

    &:focus {
      background-color: rgba(var(--destructive), 0.1);
    }

    svg {
      color: var(--destructive-foreground) !important;
    }
  }

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    color: var(--muted-foreground);
  }
`

export const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  span {
    pointer-events: none;
    position: absolute;
    left: 0.5rem;
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    align-items: center;
    justify-content: center;
  }

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
`

export const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  span {
    pointer-events: none;
    position: absolute;
    left: 0.5rem;
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 0.5rem;
    height: 0.5rem;
    fill: currentColor;
  }
`

export const StyledLabel = styled(DropdownMenuPrimitive.Label)`
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;

  &[data-inset] {
    padding-left: 2rem;
  }
`

export const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  background-color: var(--border);
  margin: 0.25rem -0.25rem;
  height: 1px;
`

export const StyledShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--muted-foreground);
`

export const StyledSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;

  &[data-inset] {
    padding-left: 2rem;
  }

  &[data-state="open"] {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  svg {
    margin-left: auto;
    width: 1rem;
    height: 1rem;
  }
`

export const StyledSubContent = styled(DropdownMenuPrimitive.SubContent)`
  background-color: var(--popover);
  color: var(--popover-foreground);
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  padding: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;

  &[data-state="open"] {
    animation: fadeIn 0.1s ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 0.1s ease-out;
  }

  &[data-side="bottom"] {
    animation-name: slideUp;
  }

  &[data-side="left"] {
    animation-name: slideRight;
  }

  &[data-side="right"] {
    animation-name: slideLeft;
  }

  &[data-side="top"] {
    animation-name: slideDown;
  }
`

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const fadeOut = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`

const slideUp = `
  @keyframes slideUp {
    from { transform: translateY(2px); }
    to { transform: translateY(0); }
  }
`

const slideDown = `
  @keyframes slideDown {
    from { transform: translateY(-2px); }
    to { transform: translateY(0); }
  }
`

const slideLeft = `
  @keyframes slideLeft {
    from { transform: translateX(2px); }
    to { transform: translateX(0); }
  }
`

const slideRight = `
  @keyframes slideRight {
    from { transform: translateX(-2px); }
    to { transform: translateX(0); }
  }
`
