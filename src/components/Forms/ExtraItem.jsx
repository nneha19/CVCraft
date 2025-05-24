
import React from "react";
import { useFieldArray } from "react-hook-form";

const ExtraItem = ({ index, register, control, errors, remove }) => {
  const {
    fields: pointerFields,
    append: appendPointer,
    remove: removePointer,
  } = useFieldArray({
    control,
    name: `extra.${index}.pointers`,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative flex flex-col gap-4">
      <h3 className="font-semibold text-lg mb-4">Extra-Curricular {index + 1}</h3>

      {/* Curricular Name */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700"> Name</label>
        <input
          {...register(`extra.${index}.name`, {
            required: "Curricular Name is required",
          })}
          placeholder="Curricular Name"
          className="border border-gray-300 rounded-md p-3"
        />
        {errors.extra?.[index]?.name && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.extra[index].name.message}
          </p>
        )}
      </div>


      {/* Pointers */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">Pointers</label>
        {pointerFields.map((field, pIndex) => (
          <div key={field.id} className="flex gap-2 items-center mb-2">
            <input
              {...register(`extra.${index}.pointers.${pIndex}.point`, {
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

      {/* Date */}
      <div className="flex flex-col mb-4">
        <label className="mb-1 font-semibold text-gray-700">Date</label>
        <input
          type="month"
          {...register(`extra.${index}.date`, {
            required: "Date is required",
          })}
          className="border border-gray-300 rounded-md p-3"
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
