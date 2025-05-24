import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";
import ExtraItem from "./ExtraItem";
const ExtraForm = forwardRef(({ goToNext }, ref) => {
  const { dispatch, state } = useResume();

  const {
    register,
    control,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      extra:
        state.extra && state.extra.length > 0
          ? state.extra
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
    if (state.extra && state.extra.length > 0) {
      reset({ extra: state.extra });
    }
  }, [state.extra, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extra",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "extra", data: values.extra },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <ExtraItem
          key={item.id}
          index={index}
          register={register}
          control={control}
          errors={errors}
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
        + Add Another Activity
      </button>
    </div>
  );
});

export default ExtraForm;
