import Experience from '../components/Resume/ExperienceSection'
import Intro from '../components/Resume/IntroSection'
import Education from '../components/Resume/Education'
import Projects from '../components/Resume/ProjectSection'
import Skills from '../components/Resume/Skills'

export const initialSections = [
  { id: "intro", component: Intro,  permanent: true,},
  { id: "education", component: Education,  permanent: true,},
  { id: "experience", component: Experience,  permanent: true,},
  { id: "skills", component: Skills,  permanent: true,},
  { id: "projects", component: Projects,  permanent: true,},
];

export const resumeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SECTION":
      return [...state, action.payload];

    case "DELETE_SECTION":
      return state.filter((section) =>  section.id !== action.payload || section.permanent);

    case "REORDER_SECTIONS":
      return action.payload;

    default:
      return state;
  }
};