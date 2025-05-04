import styled from "styled-components"

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  caption-side: bottom;
`

export const StyledTableHeader = styled.thead`
  [tr] {
    border-bottom: 1px solid var(--border);
  }
`

export const StyledTableBody = styled.tbody`
  [tr:last-child] {
    border-bottom: 0;
  }
`

export const StyledTableFooter = styled.tfoot`
  border-top: 1px solid var(--border);
  background-color: var(--muted);
  opacity: 0.5;
  font-weight: 500;

  [tr]:last-child {
    border-bottom: 0;
  }
`

export const StyledTableRow = styled.tr`
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s;

  &[data-state="selected"] {
    background-color: var(--muted);
  }
`

export const StyledTableHead = styled.th`
  height: 2.5rem;
  padding: 0 0.5rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: var(--muted-foreground);

  &:has([role="checkbox"]) {
    padding-right: 0;
  }

  [role="checkbox"] {
    transform: translateY(2px);
  }
`

export const StyledTableCell = styled.td`
  padding: 0.5rem;
  vertical-align: middle;

  &:has([role="checkbox"]) {
    padding-right: 0;
  }

  [role="checkbox"] {
    transform: translateY(2px);
  }
`

export const StyledTableCaption = styled.caption`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--muted-foreground);
`
