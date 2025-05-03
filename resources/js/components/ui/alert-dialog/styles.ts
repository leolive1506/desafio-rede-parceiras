import styled from "styled-components";

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  &[data-state="open"] {
    animation: fadeIn 200ms ease-out;
  }
  &[data-state="closed"] {
    animation: fadeOut 200ms ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

export const StyledContent = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid var(--border);
  background-color: var(--background);
  padding: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition-duration: 200ms;

  &[data-state="open"] {
    animation: fadeZoomIn 200ms ease-out, slideIn 200ms ease-out;
  }

  &[data-state="closed"] {
    animation: fadeZoomOut 200ms ease-in, slideOut 200ms ease-in;
  }

  border-radius: var(--radius);

  @keyframes fadeZoomIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes fadeZoomOut {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
  }

  @keyframes slideIn {
    0% {
      transform: translate(-50%, -48%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  @keyframes slideOut {
    0% {
      transform: translate(-50%, -50%);
    }
    100% {
      transform: translate(-50%, -48%);
    }
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

export const StyledTitle = styled.div`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
`;

export const StyledDescription = styled.div`
  font-size: 0.875rem; /* text-sm */
  color: var(--muted-foreground);
`;
