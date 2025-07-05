import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";
import AchievementItem from "./AchievementItem";
const AchievementForm = forwardRef(({ goToNext }, ref) => {
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
      achievement:
        state.achievement && state.achievement.length > 0
          ? state.achievement
          : [
              {
                name: "",
                pointers: [{ point: "" }],
                date: "",
              },
            ],
    },
  });

  useEffect(() => {
    if (state.achievement && state.achievement.length > 0) {
      reset({ achievement: state.achievement });
    }
  }, [state.achievement, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievement",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "achievement", data: values.achievement },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="flex flex-col gap-6  p-6">
      {fields.map((item, index) => (
        <AchievementItem
          key={item.id}
          index={index}
          register={register}
          control={control}
          errors={errors}
          watch={watch}
          remove={remove}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            pointers: [{ point: "" }],
            date: "",
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Achievement
      </button>
    </div>
  );
});

export default AchievementForm;
