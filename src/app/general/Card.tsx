import { cn } from "@/lib/utils";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden h-full w-full bg-white dark:bg-black border border-sky-200 dark:border-sky-950 group-hover:border-sky-400 dark:group-hover:border-sky-800 relative z-50",
        className
      )}
    >
      <div className="relative z-20">
        <div>{children}</div>
      </div>
    </div>
  );
};
