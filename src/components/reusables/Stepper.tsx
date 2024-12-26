'use client'

import { Step } from "@/types";
import React from "react";

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <div className="flex flex-col items-center gap-[10px] justify-center w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-[20px]">
          <div className="flex flex-col items-center">
            <div
              className={`w-[35px] h-[35px] flex items-center justify-center rounded-full text-[1rem] ${
                index < activeStep
                  ? "bg-primary text-white"
                  : index === activeStep
                  ? "bg-primary outline-2 outline outline-offset-[3px] outline-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.icon ? step.icon : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-[2px] h-[50px] mt-[10px] ${
                  index < activeStep ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>

          <div>
            <h1 className="text-[1.1rem] text-gray-700">{step.title}</h1>
            <p className="text-[0.9rem] text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
