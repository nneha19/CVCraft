import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const LanguageForm = forwardRef(({ goToNext }, ref) => {
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      language: [
        {
          name: "",
          proficiency: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "language",
  });

  const { dispatch } = useResume();

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "language", data: values.language },
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
          <h3 className="font-semibold text-lg mb-4">Language {index + 1}</h3>

          {/* Name */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">
              Language Name
            </label>
            <input
              {...register(`language.${index}.name`, {
                required: "Language Name is required",
              })}
              placeholder="Hindi, English, Chinese, etc"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.language?.[index]?.name && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.language[index].name.message}
              </p>
            )}
          </div>

          {/* Proficiency  */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">
              Proficiency
            </label>
            <input
              type="number"
              min="0"
              max="10"
              {...register(`language.${index}.proficiency`, {
                required: "Proficiency is required",
              })}
              placeholder="Proficiency 1-10"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.language?.[index]?.proficiency && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.language[index].proficiency.message}
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

      {/* Add Language Button */}
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            proficiency: "",
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Language
      </button>
    </form>
  );
});

export default LanguageForm;
