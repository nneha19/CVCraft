import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";
import ExperienceItem from "./ExperienceItem";
const ExperienceForm = forwardRef(({ goToNext }, ref) => {
  const { dispatch, state } = useResume();

  const {
    register,
    control,
    watch,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      experience:
        state.experience && state.experience.length > 0
          ? state.experience
          : [
              {
                company_name: "",
                position: "",
                pointers: [{ point: "" }],
                from_date: "",
                to_date: "",
              },
            ],
    },
  });

  useEffect(() => {
    if (state.experience && state.experience.length > 0) {
      reset({ experience: state.experience });
    }
  }, [state.experience, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "experience", data: values.experience },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="flex flex-col gap-6 p-6">
      {fields.map((item, index) => (
        <ExperienceItem
          key={item.id}
          index={index}
          register={register}
          control={control}
          errors={errors}
          remove={remove}
          watch={watch}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            company_name: "",
            position: "",
            pointers: [{ point: "" }],
            from_date: "",
            to_date: "",
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Experience
      </button>
    </div>
  );
});

export default ExperienceForm;
