import Experience from "../components/Draggable/ExperienceSection";
import Intro from "../components/Draggable/IntroSection";
import Education from "../components/Draggable/Education";
import Projects from "../components/Draggable/ProjectSection";
import Skills from "../components/Draggable/Skills";
import Achievements from "../components/Draggable/Achievements";
import Language from "../components/Draggable/Language";
import Reference from "../components/Draggable/Reference";
import Extra from "../components/Draggable/Extra";

export const initialSections = [
  { id: "intro", component: Intro, permanent: true },
  { id: "education", component: Education, permanent: true },
  { id: "experience", component: Experience, permanent: true },
  { id: "skills", component: Skills, permanent: true },
  { id: "projects", component: Projects, permanent: true },
  { id: "reference", component: Reference, permanent: false },
  { id: "language", component: Language, permanent: false },
  { id: "extra", component: Extra, permanent: false },
  { id: "achievement", component: Achievements, permanent: true },
];

export const resumeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SECTION":
      return [...state, action.payload];

    case "DELETE_SECTION":
      return state.filter(
        (section) => section.id !== action.payload || section.permanent
      );

    case "REORDER_SECTIONS":
      return action.payload;

    default:
      return state;
  }
};
