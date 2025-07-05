import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const ReferenceForm = forwardRef(({ goToNext }, ref) => {
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
      reference: state.reference.length
        ? state.reference
        : [{ name: "", profession: "", contact: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reference",
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "reference", data: values.reference },
        });
        return true;
      }
      return false;
    },
  }));

  return (
    <form className="w-full flex flex-col gap-6  p-6 font-sans">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative lg:mt-12 lg:mb-12 sm:mt-6 sm:mb-6 w-full mx-auto bg-white dark:bg-gray-900 rounded-lg  flex flex-col gap-6 font-sans"
        >
          <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-white">
            Reference {index + 1}
          </h3>
          <hr className="pb-12 border-gray-400 dark:border-gray-600"></hr>

          {/* Name */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              {...register(`reference.${index}.name`, {
                required: "Name is required",
              })}
              placeholder="Full Name of Reference"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
            />
            {errors.reference?.[index]?.name && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.reference[index].name.message}
              </p>
            )}
          </div>

          {/* Profession */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700 dark:text-gray-200">
              Profession
            </label>
            <input
              {...register(`reference.${index}.profession`, {
                required: "Profession is required",
              })}
              placeholder="Manager, Director, etc"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
            />
            {errors.reference?.[index]?.profession && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.reference[index].profession.message}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label
              className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
              htmlFor="phone"
            >
              Contact Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register(`reference.${index}.contact`, {
                required: "Contact number is required",
                pattern: {
                  value: /^(?:\+91|91)?[-\s]?([6-9]\d{9})$/,
                  message: "Invalid contact number",
                },
              })}
              placeholder="+91 9876543210"
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
            />
            {errors.reference?.[index]?.contact && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.reference[index].contact.message}
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

      {/* Add Reference Button */}
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            profession: "",
            contact: "",
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Reference
      </button>
    </form>
  );
});

export default ReferenceForm;
