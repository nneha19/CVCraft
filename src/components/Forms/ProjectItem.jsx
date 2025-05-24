
import React from "react";
import { useFieldArray } from "react-hook-form";

const ProjectItem = ({ index, register, control, errors, remove }) => {
  const {
    fields: pointerFields,
    append: appendPointer,
    remove: removePointer,
  } = useFieldArray({
    control,
    name: `projects.${index}.pointers`,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative flex flex-col gap-4">
      <h3 className="font-semibold text-lg mb-4">Project {index + 1}</h3>

      {/* Project Name */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">Project Name</label>
        <input
          {...register(`projects.${index}.name`, {
            required: "Project Name is required",
          })}
          placeholder="Project Name"
          className="border border-gray-300 rounded-md p-3"
        />
        {errors.projects?.[index]?.name && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.projects[index].name.message}
          </p>
        )}
      </div>


      {/* Pointers */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">Pointers</label>
        {pointerFields.map((field, pIndex) => (
          <div key={field.id} className="flex gap-2 items-center mb-2">
            <input
              {...register(`projects.${index}.pointers.${pIndex}.point`, {
                required: "Pointer cannot be empty",
              })}
              placeholder={`Pointer ${pIndex + 1}`}
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            {pointerFields.length > 1 && pIndex !== 0 ? (
              <button
                type="button"
                onClick={() => removePointer(pIndex)}
                className="text-red-500 hover:text-red-700 cursor-pointer font-bold"
              >
                ✕
              </button>
            ) : (
              <span className="w-4 inline-block" />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendPointer({ point: "" })}
          className="text-sm text-indigo-600 hover:underline mt-2 cursor-pointer font-semibold"
        >
          + Add Pointer
        </button>
      </div>

       {/* Project Link */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700" htmlFor="link">
          Project Link
        </label>
        <input
          id="link"
          type="url"
          {...register(`projects.${index}.link`, {
            required: "Project Link is required",
            pattern: {
              value:
                /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
              message: "Invalid Project Link",
            },
          })}
          placeholder="https://yourprojectlink.com"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.projects?.[index]?.link && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.projects[index].link.message}
          </p>
        )}
      </div>

      {/* Start Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">Start Date</label>
        <input
          type="month"
          {...register(`projects.${index}.from_date`, {
            required: "Start Date is required",
          })}
          className="border border-gray-300 rounded-md p-3"
        />
        {errors.projects?.[index]?.from_date && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.projects[index].from_date.message}
          </p>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">End Date</label>
        <input
          type="month"
          {...register(`projects.${index}.to_date`, {
            required: "End Date is required",
          })}
          className="border border-gray-300 rounded-md p-3"
        />
        {errors.projects?.[index]?.to_date && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.projects[index].to_date.message}
          </p>
        )}
      </div>

      {/* Remove Project */}
      {index !== 0 && (
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
  );
};

export default ProjectItem;
