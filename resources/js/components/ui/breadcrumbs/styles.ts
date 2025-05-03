import styled from "styled-components"

export const StyledBreadcrumb = styled.nav`
  &[aria-label="breadcrumb"] {
    display: block;
  }
`

export const StyledBreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
  word-break: break-word;

  @media (min-width: 640px) {
    gap: 0.625rem;
  }
`

export const StyledBreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`

export const StyledBreadcrumbLink = styled.a`
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    color: var(--foreground);
  }
`

export const StyledBreadcrumbPage = styled.span`
  color: var(--foreground);
  font-weight: 400;

  &[role="link"] {
    cursor: default;
  }

  &[aria-disabled="true"] {
    opacity: 0.6;
  }

  &[aria-current="page"] {
    color: inherit;
  }
`

export const StyledBreadcrumbSeparator = styled.li`
  &[role="presentation"] {
    user-select: none;
  }

  &[aria-hidden="true"] {
    visibility: hidden;
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`

export const StyledBreadcrumbEllipsis = styled.span`
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;

  &[role="presentation"] {
    user-select: none;
  }

  &[aria-hidden="true"] {
    visibility: hidden;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`
