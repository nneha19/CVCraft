import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const SkillsForm = forwardRef(({ goToNext }, ref) => {
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      skills: [
        {
          group_title: "",
          content: [""],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const { dispatch } = useResume();

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();

      
      if (valid) {
        const values = getValues();

        const transformedSkills = values.skills.map((group)=>({
          group_title:group.group_title,
        content: group.contentString
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        }))

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
    <form className="w-full flex flex-col gap-6 font-sans">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-md relative flex flex-col gap-4"
        >
          <h3 className="font-semibold text-lg mb-4">Skills {index + 1}</h3>

          {/* Skills Group */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">
              Skill Group Name
            </label>
            <input
              {...register(`skills.${index}.group_title`, {
                required: "Skills is required",
              })}
              placeholder="Languages/Tools/Design etc"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.skills?.[index]?.group_title && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.skills[index].group_title.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              {...register(`skills.${index}.contentString`, {
                required: "Please enter at least one skill",
              })}
              placeholder="e.g. HTML, CSS, JavaScript"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
