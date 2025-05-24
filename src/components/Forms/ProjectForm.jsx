import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";
import ProjectItem from "./ProjectItem";
const ProjectForm = forwardRef(({ goToNext }, ref) => {
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
      projects:
        state.projects && state.projects.length > 0
          ? state.projects
          : [
              {
                name: "",
                pointers: [{ point: "" }],
                link: "",
                from_date: "",
                to_date: "",
              },
            ],
    },
  });

  useEffect(() => {
    if (state.projects && state.projects.length > 0) {
      reset({ projects: state.projects });
    }
  }, [state.projects, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "projects", data: values.projects },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <ProjectItem
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
          append( {
                name: "",
                pointers: [{ point: "" }],
                link: "",
                from_date: "",
                to_date: "",
              },)
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Project
      </button>
    </div>
  );
});

export default ProjectForm;
