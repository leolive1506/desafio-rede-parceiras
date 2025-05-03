import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import {
  StyledSheet,
  StyledSheetTrigger,
  StyledSheetClose,
  StyledSheetPortal,
  StyledSheetOverlay,
  StyledSheetContent,
  StyledSheetHeader,
  StyledSheetFooter,
  StyledSheetTitle,
  StyledSheetDescription
} from "./styles"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <StyledSheet data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <StyledSheetTrigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <StyledSheetClose data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <StyledSheetPortal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return <StyledSheetOverlay data-slot="sheet-overlay" {...props} />
}

function SheetContent({ children, side = "right", ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <StyledSheetContent side={side} {...props}>
        {children}
        <StyledSheetClose>
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </StyledSheetClose>
      </StyledSheetContent>
    </SheetPortal>
  )
}

function SheetHeader({ ...props }: React.ComponentProps<"div">) {
  return <StyledSheetHeader data-slot="sheet-header" {...props} />
}

function SheetFooter({ ...props }: React.ComponentProps<"div">) {
  return <StyledSheetFooter data-slot="sheet-footer" {...props} />
}

function SheetTitle({ ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <StyledSheetTitle data-slot="sheet-title" {...props} />
}

function SheetDescription({ ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <StyledSheetDescription data-slot="sheet-description" {...props} />
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
}
