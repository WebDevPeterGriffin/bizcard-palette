import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    isCompleted && "bg-brand-primary text-brand-primary-foreground",
                    isCurrent && "bg-brand-secondary text-brand-primary-foreground ring-4 ring-brand-secondary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center font-medium",
                    isCurrent && "text-brand-secondary",
                    isCompleted && "text-brand-primary",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 flex-1 mx-2 rounded transition-all duration-300",
                    isCompleted ? "bg-brand-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
