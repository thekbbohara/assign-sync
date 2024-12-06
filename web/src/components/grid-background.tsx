import { ReactNode } from "react";

export const GridBackground = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[calc(100svh-110px)] w-full dark:bg-transparent bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-transparent bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="flex flex-col text-3xl sm:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        {children}
      </p>
    </div>
  );
};
