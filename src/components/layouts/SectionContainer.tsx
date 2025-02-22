import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Container } from "./Container";
import { GridPattern } from "../ui/grid-pattern";

type SectionContainerProps = {
  padded?: boolean;
  withBackground?: boolean;
  containerClassName?: string;
};

export const SectionContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(
  (
    {
      className,
      children,
      padded = false,
      containerClassName,
      withBackground = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative h-full w-full", containerClassName)}>
        <Container
          ref={ref}
          className={cn(className, padded ? "px-4" : "")}
          {...props}
        >
          {children}
          {withBackground && (
            <GridPattern
              width={50}
              height={50}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                "-z-50",
              )}
            />
          )}
        </Container>
      </div>
    );
  },
);

SectionContainer.displayName = "SectionContainer";
