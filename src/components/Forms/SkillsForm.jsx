import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const SkillsForm = forwardRef(({ goToNext }, ref) => {
  const { dispatch, state } = useResume();

  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      skills: state.skills.map((group) => ({
        group_title: group.group_title || "",
        contentString: (group.content || []).join(", "),
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();

      if (valid) {
        const values = getValues();

        const transformedSkills = values.skills.map((group) => ({
          group_title: group.group_title,
          content: group.contentString
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
        }));

        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "skills", data: transformedSkills },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <form className="w-full flex flex-col gap-6 p-6 font-sans">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="lg:mt-12 relative lg:mb-12 sm:mt-6 sm:mb-6 w-full mx-auto  bg-white dark:bg-gray-900 rounded-lg  flex flex-col gap-6 font-sans"
        >
          <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
            Skills {index + 1}
          </h3>
          <hr className="pb-12 border-gray-400 dark:border-gray-600"></hr>

          {/* Skills Group */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Skill Group Name
            </label>
            <input
              {...register(`skills.${index}.group_title`, {
                required: "Skills is required",
              })}
              placeholder="Languages/Tools/Design etc"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
            />
            {errors.skills?.[index]?.group_title && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.skills[index].group_title.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Skills (comma-separated)
            </label>
            <input
              {...register(`skills.${index}.contentString`, {
                required: "Please enter at least one skill",
              })}
              placeholder="e.g. HTML, CSS, JavaScript"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
            />
            {errors.skills?.[index]?.contentString && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.skills[index].contentString.message}
              </p>
            )}
          </div>

          {/* Remove Button */}
          {fields.length > 1 && index !== 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 p-4 font-medium cursor-pointer text-red-500 hover:text-red-700"
              title="Remove"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Skill Group Button */}
      <button
        type="button"
        onClick={() =>
          append({
            group_title: "",
            content: [""],
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Skill Group
      </button>
    </form>
  );
});

export default SkillsForm;
