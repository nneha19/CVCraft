import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const isStepOptional = (step) => [2, 5, 6, 7].includes(step);
  const isStepSkipped = (step) => skipped.has(step);
  const navigate = useNavigate();

  const stepToSectionId = {
    2: "experience",
    5: "reference",
    6: "language",
    7: "extra",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (formRef.current?.isFormValid !== undefined) {
        setIsStepValid(formRef.current.isFormValid);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeStep]);

  useEffect(() => {
    console.log("Updated intro state:", state);
  }, [state]);

  const handleNext = async () => {
    if (activeStep >= steps.length) return;

    const isValid = await formRef.current?.submitForm();
    if (!isValid) return; // do not proceed if form is invalid

    const newSkipped = new Set(skipped);
    newSkipped.delete(activeStep);
    setSkipped(newSkipped);
    setActiveStep((prev) => prev + 1);

    if (stepToSectionId[activeStep]) {
      dispatch({
        type: "SET_SECTION_VISIBILITY",
        payload: { section: stepToSectionId[activeStep], visible: true },
      });
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep) || activeStep >= steps.length - 1) return;

    const newSkipped = new Set(skipped);
    newSkipped.add(activeStep);
    setSkipped(newSkipped);

    const skippedSection = stepToSectionId[activeStep];
    if (skippedSection) {
      dispatch({
        type: "SET_SECTION_VISIBILITY",
        payload: { section: skippedSection, visible: false },
      });
    }

    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="w-full p-4 flex flex-col gap-6 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 min-h-[calc(100vh-140px)]">
      {/* Mobile view*/}
      {activeStep < steps.length && (
        <div className="block md:hidden text-center p-6">
          <p className="text-sm text-gray-500 mb-1">
            Step {activeStep + 1} of {steps.length}
          </p>
          <p className="text-lg font-semibold text-primary">
            {steps[activeStep]}
          </p>
        </div>
      )}

      {/* Desktop view*/}
      <div className="hidden md:block pt-6">
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
                      ? "font-bold text-[#064991] dark:text-[#559ce7] "
                      : "text-gray-500"
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
      <div className="flex items-center justify-between gap-4 p-6">
        <Button
          hidden={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "#6366F1" : "#4f39f6",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#334155" : "#E0F2FE",
            color: (theme) =>
              theme.palette.mode === "dark" ? "#6366F1" : "#4f39f6",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#334155" : "#E0F2FE",

              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#3B82F6" : "#1D4ED8",
            },
          }}
        >
          Back
        </Button>

        <div className="flex gap-2 ml-auto">
       {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip}>
              Skip
            </Button>
          )}
          {activeStep < steps.length ? (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!isStepValid}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#6366F1" : "#4f39f6", // indigo-400 / indigo-600
                color: "#fff",
                "&:hover": {
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "##4f39f6" : "#4338CA", // indigo-600 / indigo-700
                },
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          ) : (
            <>
              <Button variant="outlined" onClick={() => navigate("/preview")}>
                Preview{" "}
              </Button>
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
