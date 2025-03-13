
import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
          currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
        )}>
          1
        </div>
        <div className={cn(
          "w-16 h-1 mx-1",
          currentStep >= 2 ? "bg-primary" : "bg-gray-200"
        )}></div>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
          currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
        )}>
          2
        </div>
        <div className={cn(
          "w-16 h-1 mx-1",
          currentStep >= 3 ? "bg-primary" : "bg-gray-200"
        )}></div>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm",
          currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
        )}>
          3
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
