import React from "react";
import { useFieldArray } from "react-hook-form";

const ExperienceItem = ({
  index,
  register,
  control,
  errors,
  remove,
  watch,
}) => {
  const {
    fields: pointerFields,
    append: appendPointer,
    remove: removePointer,
  } = useFieldArray({
    control,
    name: `experience.${index}.pointers`,
  });

  return (
    <div className="lg:mt-12 relative lg:mb-12 sm:mt-6 sm:mb-6 w-full mx-auto  bg-white dark:bg-gray-900 rounded-lg  flex flex-col gap-6 font-sans">
      <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
        Experience {index + 1}
      </h3>
      <hr className="pb-12 border-gray-400 dark:border-gray-600"></hr>

      {/* Company Name */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Company Name
        </label>
        <input
          {...register(`experience.${index}.company_name`, {
            required: "Company Name is required",
          })}
          placeholder="Company Name"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
        />
        {errors.experience?.[index]?.company_name && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.experience[index].company_name.message}
          </p>
        )}
      </div>

      {/* Position */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Position
        </label>
        <input
          {...register(`experience.${index}.position`, {
            required: "Position is required",
          })}
          placeholder="Enter your position"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
        />
        {errors.experience?.[index]?.position && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.experience[index].position.message}
          </p>
        )}
      </div>

      {/* Pointers */}
     <div className="flex flex-col mb-4">
  {/* Heading Label */}
  <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
    Pointers
  </label>

  {/* Pointer Inputs */}
  {pointerFields.map((field, pIndex) => (
    <div key={field.id} className="flex gap-2 items-center mb-2 w-full">
      <div className="w-full">
        <input
          {...register(`experience.${index}.pointers.${pIndex}.point`, {
            required: "Pointer cannot be empty",
            maxLength: {
              value: 150,
              message: "Max 150 characters allowed",
            },
          })}
          placeholder={`Pointer ${pIndex + 1}`}
          className="border w-full border-gray-300 dark:border-gray-700 mb-1 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {watch?.(`experience.${index}.pointers.${pIndex}.point`)?.length || 0}/150
          </span>
          {errors.experience?.[index]?.pointers?.[pIndex]?.point && (
            <p className="text-red-600 text-sm">
              {errors.experience[index].pointers[pIndex].point.message}
            </p>
          )}
        </div>
      </div>

      {/* Delete Pointer Button */}
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

  {/* Add Pointer Button */}
  <button
    type="button"
    onClick={() => appendPointer({ point: "" })}
    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-2 cursor-pointer font-semibold"
  >
    + Add Pointer
  </button>
</div>


      {/* Start Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Start Date
        </label>
        <input
          type="month"
          {...register(`experience.${index}.from_date`, {
            required: "Start Date is required",
          })}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
        />
        {errors.experience?.[index]?.from_date && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.experience[index].from_date.message}
          </p>
        )}
      </div>

      {/* End Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          End Date
        </label>
        <input
          type="month"
          {...register(`experience.${index}.to_date`, {
            required: "End Date is required",
          })}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
        />
        {errors.experience?.[index]?.to_date && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.experience[index].to_date.message}
          </p>
        )}
      </div>

      {/* Remove Experience */}
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

export default ExperienceItem;
