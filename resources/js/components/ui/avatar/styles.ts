import styled from "styled-components";
import * as AvatarPrimitive from "@radix-ui/react-avatar"

export const StyledAvatar = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  width: 2rem; /* size-8 */
  height: 2rem; /* size-8 */
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px; /* rounded-full */
`;

export const StyledAvatarImage = styled(AvatarPrimitive.Image)`
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
`

export const StyledAvatarFallback = styled(AvatarPrimitive.Fallback)`
  background-color: var(--muted); /* bg-muted */
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px; /* rounded-full */
`;
