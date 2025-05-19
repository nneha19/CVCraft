import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import ResumeBuilder from "./ResumeBuilder";


/*Components*/
import IntroSection from "./Resume/IntroSection";
import Education from "./Resume/Education";
import ExperienceSection from "./Resume/ExperienceSection";
import Skills from "./Resume/Skills";
import ProjectSection from "./Resume/ProjectSection";
import Reference from './Resume/Reference';
import Language from './Resume/Language';
import Extra from './Resume/Extra';
import Achievements from './Resume/Achievements';


const steps = [
  "Introduction",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Reference",
  "Language",
  "Extra-Curricular",
  "Achievements",
];


const getStepComponent = (step) =>{
  switch(step){
    case 0 : return <IntroSection/>; 
    case 1 : return <Education/>;
    case 2 : return <ExperienceSection/>;
    case 3 : return <Skills/>;
    case 4 : return <ProjectSection/>;
    case 5 : return <Reference/>;
    case 6 : return <Language/>;
    case 7 : return <Extra/>;
    case 8 : return <Achievements/>;
  }
}

export default function ResumeStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step >= 5;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    if (activeStep >= steps.length) return; // prevent overflow

    const newSkipped = new Set(skipped);
    newSkipped.delete(activeStep);
    setSkipped(newSkipped);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleSkip = () => {
    if (!isStepOptional(activeStep) || activeStep >= steps.length - 1) return;

    setSkipped((prev) => new Set(prev).add(activeStep));
    setActiveStep((prev) => prev + 1);
  };


  return (
    <div className="w-full p-4 flex flex-col gap-6">
      {/* Mobile view: Only current step */}
      {activeStep < steps.length && (
        <div className="block md:hidden text-center">
          <p className="text-sm text-gray-500 mb-1">
            Step {activeStep + 1} of {steps.length}
          </p>
          <p className="text-lg font-semibold text-primary">
            {steps[activeStep]}
          </p>
        </div>
      )}


      {/* Desktop view: full stepper */}
      <div className="hidden md:block">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={!isStepSkipped(index)}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: "text-gray-300",
                    active: "text-blue-600",
                    completed: "text-green-500",
                  },
                }}
              >
                <span
                  className={`${activeStep === index
                      ? "font-bold text-blue-600"
                      : "text-gray-600"
                    }`}
                >
                  {label}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Navigation Buttons */}
      <div>{getStepComponent(activeStep)}</div>
      <div className="flex items-center justify-between gap-4">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        <div className="flex gap-2 ml-auto">
          {isStepOptional(activeStep) && activeStep < steps.length - 1 && (
            <Button color="inherit" onClick={handleSkip}>
              Skip
            </Button>
          )}
          {activeStep < steps.length ? (
      <Button onClick={handleNext} variant="contained">
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    ) : (
      <>
        <Button variant="outlined">Check ATS Score</Button>
        <Button variant="outlined">Export as PDF</Button>
      </>
    )}
        </div>
      </div>

      {/* Finish Message */}
      {activeStep === steps.length && (
        <div className="text-center">
          <div className="mb-4">
            <ResumeBuilder />
          </div>
        </div>
      )}
    </div>
  );
}
