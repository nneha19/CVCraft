import { act, createContext, useContext, useReducer } from "react";
import { initialSections } from "../config/dragSection";
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
  experience: [
    {
      company_name: "",
      position: "",
      pointers: [{ point: "" }],
      from_date: "",
      to_date: "",
    },
  ],
  skills: [
    {
      group_title: "",
      content: [""],
    },
  ],
  projects: [
    {
      name: "",
      pointers: [{ point: "" }],
      link: "",
      from_date: "",
      to_date: "",
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
      pointers: [{ point: "" }],
      date: "",
    },
  ],
  achievement: [
    {
      name: "",
      pointers: [{ point: "" }],
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
  sectionVisibility: {
    reference: true,
    language: true,
    extra: true,
  },

  sectionOrder: initialSections.map((s) => s.id),
};

const resumeContext = createContext();

const resumeReducer = (state, action) => {
  console.log("Reducer action received:", action);
  switch (action.type) {
    case "UPDATE_SECTION":
      return {
        ...state,
        [action.payload.section]: action.payload.data,
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

    case "SET_SECTION_VISIBILITY":
      return {
        ...state,
        sectionVisibility: {
          ...state.sectionVisibility,
          [action.payload.section]: action.payload.visible,
        },
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.payload.section]: state[action.payload.section].filter(
          (_, i) => i !== action.payload.index
        ),
      };

    case "SET_SECTION_ORDER":
      return {
        ...state,
        sectionOrder: action.payload,
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
