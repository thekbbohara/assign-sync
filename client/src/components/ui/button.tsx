import cn from "@/utils/cn";
import React from "react";

const Button = ({
  children,
  type,
  className,
  onBtnClick,
  ...props
}: {
  children: string;
  type?: "outline";
  className?: string;
  onBtnClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        "min-w-[90px] border px-2 py-1",
        type !== "outline"
          ? "border-transparent bg-[#007acc]"
          : "border-white bg-transparent",
        className,
      )}
      {...props}
      onClick={onBtnClick}
    >
      {children}
    </button>
  );
};

export default Button;
