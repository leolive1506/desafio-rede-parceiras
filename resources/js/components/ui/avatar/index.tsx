import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { StyledAvatar, StyledAvatarFallback, StyledAvatarImage } from "./styles"

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return <StyledAvatar className={className} {...props} />
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <StyledAvatarImage className={className} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <StyledAvatarFallback className={className} {...props} />
}

export { Avatar, AvatarImage, AvatarFallback }
