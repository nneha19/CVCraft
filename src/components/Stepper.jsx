import { useState, useRef, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import ResumeBuilder from "./ResumeBuilder";

/*Components*/
import IntroForm from "./Forms/IntroForm";
import EducationForm from "./Forms/EducationForm";
import ExperienceForm from "./Forms/ExperienceForm";
import SkillsForm from "./Forms/SkillsForm";
import ProjectForm from "./Forms/ProjectForm";
import ReferenceForm from "./Forms/ReferenceForm";
import LanguageForm from "./Forms/LanguageForm";
import ExtraForm from "./Forms/ExtraForm";
import AchievementForm from "./Forms/AchievementForm";
import { useResume } from "../context/ResumeContext";

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

const getStepComponent = (step, ref, goToNext) => {
  switch (step) {
    case 0:
      return <IntroForm ref={ref} goToNext={goToNext} />;
    case 1:
      return <EducationForm ref={ref} goToNext={goToNext} />;
    case 2:
      return <ExperienceForm ref={ref} goToNext={goToNext} />;
    case 3:
      return <SkillsForm ref={ref} goToNext={goToNext} />;
    case 4:
      return <ProjectForm ref={ref} goToNext={goToNext} />;
    case 5:
      return <ReferenceForm ref={ref} goToNext={goToNext} />;
    case 6:
      return <LanguageForm ref={ref} goToNext={goToNext} />;
    case 7:
      return <ExtraForm ref={ref} goToNext={goToNext} />;
    case 8:
      return <AchievementForm ref={ref} goToNext={goToNext} />;
  }
};

export default function ResumeStepper() {
  const formRef = useRef();
  const [isStepValid, setIsStepValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { state, dispatch } = useResume();
  const isStepOptional = (step) => step >= 5;
  const isStepSkipped = (step) => skipped.has(step);
  useEffect(() => {
    const interval = setInterval(() => {
      if (formRef.current?.isFormValid !== undefined) {
        setIsStepValid(formRef.current.isFormValid);
      }
    }, 200); // Check every 200ms (or use a better event-driven pattern)

    return () => clearInterval(interval);
  }, [activeStep]);

  useEffect(() => {
    console.log("🔥 Updated intro state:", state);
  }, [state]);

  const handleNext = async () => {
    if (activeStep >= steps.length) return;

    const isValid = await formRef.current?.submitForm();
    if (!isValid) return; // do not proceed if form is invalid

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
                  className={`${
                    activeStep === index
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
      <div>{getStepComponent(activeStep, formRef, handleNext)}</div>
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
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!isStepValid}
            >
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
