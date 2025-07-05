import React from "react";
import { useFieldArray } from "react-hook-form";

const ExtraItem = ({ index, register, control, errors, remove, watch }) => {
  const {
    fields: pointerFields,
    append: appendPointer,
    remove: removePointer,
  } = useFieldArray({
    control,
    name: `extra.${index}.pointers`,
  });

  return (
    <div className="relative lg:mt-12 lg:mb-12 sm:mt-6 sm:mb-6 w-full mx-auto bg-white dark:bg-gray-900 rounded-lg  flex flex-col gap-6 font-sans">
      <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
        Extra-Curricular {index + 1}
      </h3>
      <hr className="pb-12 border-gray-400 dark:border-gray-600"></hr>

      {/* Curricular Name */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          {" "}
          Name
        </label>
        <input
          {...register(`extra.${index}.name`, {
            required: "Curricular Name is required",
          })}
          placeholder="Curricular Name"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.extra?.[index]?.name && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.extra[index].name.message}
          </p>
        )}
      </div>

      {/* Pointers */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Pointers
        </label>

        {pointerFields.map((field, pIndex) => (
          <div key={field.id} className="flex gap-2 items-start mb-2 w-full">
            <div className="w-full">
              <input
                {...register(`extra.${index}.pointers.${pIndex}.point`, {
                  required: "Pointer cannot be empty",
                  maxLength: {
                    value: 120,
                    message: "Max 120 characters allowed",
                  },
                })}
                placeholder={`Pointer ${pIndex + 1}`}
                className="border w-full border-gray-300 dark:border-gray-700 mb-1 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
              />

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {watch?.(`extra.${index}.pointers.${pIndex}.point`)?.length ||
                    0}
                  /120
                </span>
                {errors.extra?.[index]?.pointers?.[pIndex]?.point && (
                  <p className="text-red-600 text-xs">
                    {errors.extra[index].pointers[pIndex].point.message}
                  </p>
                )}
              </div>
            </div>

            {pointerFields.length > 1 && pIndex !== 0 ? (
              <button
                type="button"
                onClick={() => removePointer(pIndex)}
                className="text-red-500 hover:text-red-700 cursor-pointer font-bold text-lg"
                title="Remove"
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
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-2 cursor-pointer font-semibold"
        >
          + Add Pointer
        </button>
      </div>

      {/* Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
          Date
        </label>
        <input
          type="month"
          {...register(`extra.${index}.date`, {
            required: "Date is required",
          })}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.extra?.[index]?.date && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.extra[index].date.message}
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

export default ExtraItem;
