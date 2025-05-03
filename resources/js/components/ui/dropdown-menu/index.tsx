import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import {
  StyledContent,
  StyledItem,
  StyledCheckboxItem,
  StyledRadioItem,
  StyledLabel,
  StyledSeparator,
  StyledShortcut,
  StyledSubContent,
  StyledSubTrigger
} from "./styles"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
const DropdownMenuSub = DropdownMenuPrimitive.Sub

function DropdownMenuContent({ sideOffset = 4, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPortal>
      <StyledContent sideOffset={sideOffset} {...props} />
    </DropdownMenuPortal>
  )
}

function DropdownMenuItem({ inset, variant = "default", ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return <StyledItem data-inset={inset} data-variant={variant} {...props} />
}

function DropdownMenuCheckboxItem({ children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <StyledCheckboxItem checked={checked} {...props}>
      <span>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </StyledCheckboxItem>
  )
}

function DropdownMenuRadioItem({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <StyledRadioItem {...props}>
      <span>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </StyledRadioItem>
  )
}

function DropdownMenuLabel({ inset, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return <StyledLabel data-inset={inset} {...props} />
}

function DropdownMenuSeparator(props: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <StyledSeparator {...props} />
}

function DropdownMenuShortcut(props: React.ComponentProps<"span">) {
  return <StyledShortcut {...props} />
}

function DropdownMenuSubTrigger({ inset, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <StyledSubTrigger data-inset={inset} {...props}>
      {children}
      <ChevronRightIcon />
    </StyledSubTrigger>
  )
}

function DropdownMenuSubContent(props: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return <StyledSubContent {...props} />
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
}
