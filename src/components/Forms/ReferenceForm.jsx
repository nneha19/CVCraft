import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const ReferenceForm = forwardRef(({ goToNext }, ref) => {
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      reference: [
       {
      name: "",
      profession: "",
      contact: "",
    }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reference",
  });

  const { dispatch } = useResume();

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
    <form className="w-full flex flex-col gap-6 font-sans">
      {fields.map((item, index) => (
        <div
      key={item.id}
      className="bg-white p-6 rounded-lg shadow-md relative flex flex-col gap-4"
    >
          <h3 className="font-semibold text-lg mb-4">Reference {index + 1}</h3>

          {/* Name */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">
              Name
            </label>
            <input
              {...register(`reference.${index}.name`, {
                required: "Name is required",
              })}
              placeholder="Full Name of Reference"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.reference?.[index]?.name && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.reference[index].name.message}
              </p>
            )}
          </div>

          {/* Profession */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">Profession</label>
            <input
              {...register(`reference.${index}.profession`, {
                required: "Profession is required",
              })}
              placeholder="Manager, Director, etc"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.reference?.[index]?.profession && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.reference[index].profession.message}
              </p>
            )}
          </div>

           {/* Contact */}
      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700" htmlFor="phone">
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
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        {errors.reference?.[index]?.contact && (
          <p className="text-red-600 mt-1 text-sm">{errors.reference[index].contact.message}</p>
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
