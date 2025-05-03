import styled, { css } from "styled-components"

export const badgeVariants = (variant: string) => {
  switch (variant) {
    case "secondary":
      return css`
        border-color: transparent;
        background-color: var(--secondary);
        color: var(--secondary-foreground);
      `
    case "destructive":
      return css`
        border-color: transparent;
        background-color: var(--destructive);
        color: white;
        &:hover {
          background-color: var(--destructive-90);
        }
        &:focus-visible {
          ring-color: var(--destructive-20);
        }
      `
    case "outline":
      return css`
        color: var(--foreground);
      `
    case "default":
    default:
      return css`
        border-color: transparent;
        background-color: var(--primary);
        color: var(--primary-foreground);
      `
  }
}

export const StyledBadge = styled.span<{ variant: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid;
  padding: 0.125rem 0.5rem; /* px-2 py-0.5 */
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 0.25rem;
  svg {
    width: 0.75rem; /* size-3 */
    height: 0.75rem; /* size-3 */
    pointer-events: none;
  }
  &:focus-visible {
    border-color: var(--ring);
    ring-color: var(--ring/50);
    ring-width: 3px;
  }
  transition: color 200ms, box-shadow 200ms;
  overflow: auto;

  ${({ variant }) => badgeVariants(variant)}
`
