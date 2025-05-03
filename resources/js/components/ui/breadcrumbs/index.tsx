import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import {
  StyledBreadcrumb,
  StyledBreadcrumbList,
  StyledBreadcrumbItem,
  StyledBreadcrumbPage,
  StyledBreadcrumbSeparator,
  StyledBreadcrumbEllipsis
} from "./styles"

function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <StyledBreadcrumb aria-label="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <StyledBreadcrumbList className={className} {...props} />
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <StyledBreadcrumbItem className={className} {...props} />
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return <Comp className={className} {...props} />
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <StyledBreadcrumbPage className={className} {...props} />
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <StyledBreadcrumbSeparator className={className} {...props}>
      {children ?? <ChevronRight />}
    </StyledBreadcrumbSeparator>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <StyledBreadcrumbEllipsis className={className} {...props}>
      <MoreHorizontal />
      <span>More</span>
    </StyledBreadcrumbEllipsis>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
