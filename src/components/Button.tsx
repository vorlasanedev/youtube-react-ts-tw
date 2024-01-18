import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["hover:bg-secondary-hover", "transition-colors"], {
  variants: {
    variant: {
      default: ["bg-gray-200", "hover:bg-gray-800 hover:text-white",],
      ghost: ["hover:bg-gray-200"],
      dark: ["bg-gray-800", "hover:bg-gray-800", "text-white"],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: ["rounded-full", "p-2", "w-10", "h-10", "flex", "items-center"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <>
      <button {...props} className={twMerge(buttonStyles({ variant, size }), className)} />
    </>
  );
}
