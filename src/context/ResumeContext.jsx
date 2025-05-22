import { act, createContext, useContext, useReducer } from "react";

const initialState = {
  intro: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
  },
  education: [
  { institute: "", course: "", from_date: "", to_date: "", gpa: "" }, 
  ],
  skills: [
    {
      group_title: "",
      content: {},
    },
  ],
  projects: [
    {
      name: "",
      pointers: {},
      link: "",
      date: "",
    },
  ],
  experience: [
    {
      name: "",
      pointers: {},
      date: "",
    },
  ],
  language: [
    {
      name: "",
      proficiency: "",
    },
  ],
  extra: [
    {
      name: "",
      pointers: {},
      date: "",
    },
  ],
  achievement: [
    {
      name: "",
      pointers: {},
      date: "",
    },
  ],
  reference: [
    {
      name: "",
      profession: "",
      contact: "",
    },
  ],
};

const resumeContext = createContext();

const resumeReducer = (state, action) => {
  console.log("Reducer action received:", action);
  switch (action.type) {
    case "UPDATE_SECTION":
      return {
        ...state,
        [action.payload.section]: {
          ...state[action.payload.section],
          ...action.payload.data,
        },
      };

    case "UPDATE_FIELD":
      const { section, index, field, value } = action.payload;
      return {
        ...state,
        [section]: state[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      };

    case "UPDATE_NESTED":
      const { nestedKey } = action.payload;
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].map((item, i) =>
          i === action.payload.index
            ? {
                ...item,
                [action.payload.field]: {
                  ...item[action.payload.field],
                  [nestedKey]: action.payload.value,
                },
              }
            : item
        ),
      };

    case "ADD_ITEM":
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          action.payload.newItem,
        ],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].filter(
          (_, i) => i !== action.payload.index
        ),
      };

    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <resumeContext.Provider value={{ state, dispatch }}>
      {children}
    </resumeContext.Provider>
  );
};

export const useResume = () => useContext(resumeContext);
