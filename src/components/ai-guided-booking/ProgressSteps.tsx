
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { id: 1, name: "Event Type" },
    { id: 2, name: "Primary Service" },
    { id: 3, name: "Recommendations" }
  ];

  return (
    <div className="mb-10">
      <ol className="flex items-center w-full">
        {steps.map((step, i) => (
          <li key={step.id} className={cn(
            "flex items-center relative",
            i < steps.length - 1 ? "w-full" : ""
          )}>
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full shrink-0 z-10 transition-all",
              currentStep > step.id 
                ? "bg-primary text-white" 
                : currentStep === step.id 
                  ? "bg-primary/20 text-primary border-2 border-primary" 
                  : "bg-gray-100 text-gray-500 border-2 border-gray-200"
            )}>
              {currentStep > step.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            <span className={cn(
              "ml-2 text-sm font-medium transition-colors",
              currentStep >= step.id ? "text-primary" : "text-gray-500"
            )}>
              {step.name}
            </span>
            
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className={cn(
                "w-full h-0.5 mx-4 transition-colors",
                currentStep > step.id ? "bg-primary" : "bg-gray-200"
              )} />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressSteps;
