// app/loading.tsx (or your loading component)
import { cn } from "@/lib/utils"

export default function Loading() {
  return (
    <div className={cn(
      "min-h-screen w-full flex items-center justify-center",
      "bg-background text-foreground" // Using shadcn variables
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute w-[200px] h-[200px] blur-[90px] animate-pulse delay-300",
          "bg-primary/20 top-1/4 left-1/4"
        )} />
        <div className={cn(
          "absolute w-[200px] h-[200px] blur-[90px] animate-pulse",
          "bg-secondary/20 bottom-1/4 right-1/4"
        )} />
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinner with gradient */}
        <div className={cn(
          "w-16 h-16 rounded-full animate-spin",
          "border-4 border-solid border-primary/10",
          "border-t-primary border-r-primary",
          "transition-all duration-500 ease-in-out"
        )} />

        {/* Animated text */}
        <div className="flex flex-col items-center gap-2">
          <h1 className={cn(
            "text-xl font-semibold tracking-tight",
            "animate-pulse delay-75"
          )}>
            Loading...
          </h1>
          <p className={cn(
            "text-sm text-muted-foreground",
            "animate-pulse delay-150"
          )}>
            Preparing your experience
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full bg-primary/30",
                "animate-pulse"
              )}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}