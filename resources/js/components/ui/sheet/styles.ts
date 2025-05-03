import styled from "styled-components"
import * as SheetPrimitive from "@radix-ui/react-dialog"

export const StyledSheet = styled(SheetPrimitive.Root)``

export const StyledSheetTrigger = styled(SheetPrimitive.Trigger)``

export const StyledSheetClose = styled(SheetPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 0.125rem;
  opacity: 0.7;
  transition: opacity 200ms;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }
  &:disabled {
    pointer-events: none;
  }
`

export const StyledSheetPortal = styled(SheetPrimitive.Portal)``

export const StyledSheetOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  &[data-state="open"] {
    animation: fadeIn 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: fadeOut 200ms ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`

export const StyledSheetContent = styled(SheetPrimitive.Content)<{ side?: "top" | "right" | "bottom" | "left" }>`
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--background);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &[data-state="open"] {
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  &[data-state="closed"] {
    animation-duration: 300ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  ${({ side }) => side === "right" && `
    inset: 0 0 0 auto;
    height: 100%;
    width: 75%;
    border-left: 1px solid var(--border);
    &[data-state="closed"] {
      animation-name: slideOutToRight;
    }
    &[data-state="open"] {
      animation-name: slideInFromRight;
    }
  `}
  ${({ side }) => side === "left" && `
    inset: 0 auto 0 0;
    height: 100%;
    width: 75%;
    border-right: 1px solid var(--border);
    &[data-state="closed"] {
      animation-name: slideOutToLeft;
    }
    &[data-state="open"] {
      animation-name: slideInFromLeft;
    }
  `}
  ${({ side }) => side === "top" && `
    inset: 0 0 auto 0;
    height: auto;
    border-bottom: 1px solid var(--border);
    &[data-state="closed"] {
      animation-name: slideOutToTop;
    }
    &[data-state="open"] {
      animation-name: slideInFromTop;
    }
  `}
  ${({ side }) => side === "bottom" && `
    inset: auto 0 0 0;
    height: auto;
    border-top: 1px solid var(--border);
    &[data-state="closed"] {
      animation-name: slideOutToBottom;
    }
    &[data-state="open"] {
      animation-name: slideInFromBottom;
    }
  `}
  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideOutToRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideOutToLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  @keyframes slideInFromTop {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes slideOutToTop {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }
  @keyframes slideInFromBottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes slideOutToBottom {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
`

export const StyledSheetHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem;
`

export const StyledSheetFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`

export const StyledSheetTitle = styled(SheetPrimitive.Title)`
  color: var(--foreground);
  font-weight: 600;
`

export const StyledSheetDescription = styled(SheetPrimitive.Description)`
  color: var(--muted-foreground);
  font-size: 0.875rem;
`
