import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useResume } from "../../context/ResumeContext";

const IntroForm = forwardRef(({ onSubmit }, ref) => {
  const { dispatch, state } = useResume();

  const {
    register,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // triggers validation on each change
    defaultValues: state.intro || {
      // fallback default
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      const valid = await trigger();
      if (valid) {
        const values = getValues();
        console.log("Form values before dispatch:", values);
        dispatch({
          type: "UPDATE_SECTION",
          payload: { section: "intro", data: values },
        });

        return true;
      }
      return false;
    },
    isFormValid: isValid,
  }));

  return (
    <form className="lg:mt-12 lg:mb-12 sm:mt-6 sm:mb-6 w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg  flex flex-col gap-6 font-sans">
      {/* Full Name */}
      <div className="flex flex-col">
        <label
          className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Your full name"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.name && (
          <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label
          className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          placeholder="you@example.com"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.email && (
          <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Mobile */}
      <div className="flex flex-col">
        <label
          className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
          htmlFor="phone"
        >
          Mobile
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(?:\+91|91)?[-\s]?([6-9]\d{9})$/,
              message: "Invalid phone number",
            },
          })}
          placeholder="+91 9876543210"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.phone && (
          <p className="text-red-600 mt-1 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Linkedin */}
      <div className="flex flex-col">
        <label
          className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
          htmlFor="linkedin"
        >
          LinkedIn
        </label>
        <input
          id="linkedin"
          type="url"
          {...register("linkedin", {
            required: "LinkedIn Account URL is required",
            pattern: {
              value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
              message: "Invalid LinkedIn URL",
            },
          })}
          placeholder="https://linkedin.com/in/username"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.linkedin && (
          <p className="text-red-600 mt-1 text-sm">{errors.linkedin.message}</p>
        )}
      </div>

      {/* Portfolio */}
      <div className="flex flex-col">
        <label
          className="mb-1 font-semibold text-gray-700 dark:text-gray-200"
          htmlFor="portfolio"
        >
          Portfolio
        </label>
        <input
          id="portfolio"
          type="url"
          {...register("portfolio", {
            required: "Portfolio URL is required",
            pattern: {
              value:
                /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
              message: "Invalid Portfolio URL",
            },
          })}
          placeholder="https://yourportfolio.com"
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 "
        />
        {errors.portfolio && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.portfolio.message}
          </p>
        )}
      </div>
    </form>
  );
});

export default IntroForm;
