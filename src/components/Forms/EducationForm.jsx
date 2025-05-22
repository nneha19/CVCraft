import { forwardRef, useImperativeHandle } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const EducationForm = forwardRef(({ goToNext }, ref) => {
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      education: [
        {
          institute: "",
          course: "",
          from_date: "",
          to_date: "",
          gpa: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const { dispatch } = useResume();

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "education", data: values.education },
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
          <h3 className="font-semibold text-lg mb-4">Education {index + 1}</h3>

          {/* School/University */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">
              School/University
            </label>
            <input
              {...register(`education.${index}.institute`, {
                required: "School/University is required",
              })}
              placeholder="University of XYZ"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.education?.[index]?.institute && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.education[index].institute.message}
              </p>
            )}
          </div>

          {/* Course */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">Course</label>
            <input
              {...register(`education.${index}.course`, {
                required: "Course is required",
              })}
              placeholder="B.Sc, B.Tech, etc."
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.education?.[index]?.course && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.education[index].course.message}
              </p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">Start Date</label>
            <input
              type="month"
              {...register(`education.${index}.from_date`, {
                required: "Start Date is required",
              })}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.education?.[index]?.from_date && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.education[index].from_date.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold text-gray-700">End Date</label>
            <input
              type="month"
              {...register(`education.${index}.to_date`, {
                required: "End Date is required",
              })}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.education?.[index]?.to_date && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.education[index].to_date.message}
              </p>
            )}
          </div>

          {/* GPA */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">GPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              {...register(`education.${index}.gpa`, {
                required: "GPA is required",
              })}
              placeholder="GPA or Percentage"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.education?.[index]?.gpa && (
              <p className="text-red-600 mt-1 text-sm">
                {errors.education[index].gpa.message}
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

      {/* Add Education Button */}
      <button
        type="button"
        onClick={() =>
          append({
            institute: "",
            course: "",
            from_date: "",
            to_date: "",
            gpa: "",
          })
        }
        className="w-full py-2 px-4 bg-indigo-600 text-white cursor-pointer rounded-md hover:bg-indigo-700 transition"
      >
        + Add Another Education
      </button>
    </form>
  );
});

export default EducationForm;
