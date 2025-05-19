import { createContext, useContext, useReducer } from "react";

const initialState = {
  intro: {
    name: "",
    email: "",
    phone: "",
    link1:"",
    link2:""
  },
  education: [
    {
        institute:"",
        course:"",
        date:"",
        gpa:"",
    },
  ],
  skills: [
    {
        group_title:"",
        content:{

        },
    }
  ],
  projects: [
    {
        name:"",
        pointers:{

        },
        link:"",
        date:"",
    },
  ],
  experience: [
    {
        name:"",
        pointers:{

        },
        date:"",
    }
  ],
  language:[
    {
        name:"",
        proficiency:"",
    },
  ],
  extra:[
    {
        name:"",
        pointers:{

        },
        date:"",
    },
  ],
  achievement:[
    {
        name:"",
        pointers:{

        },
        date:"",
    },
  ],
  reference:[
    {
        name:"",
        profession:"",
        contact:""
    },
  ]
 
};


const resumeContext = createContext();

const resumeReducer = (state,action) =>{
    switch(action.type){

    }
}


export const ResumeProvider = ({children}) =>{
    const [state,dispatch] = useReducer(resumeReducer,initialState);

    return(
        <resumeContext.Provider value={{state,dispatch}}>
            {children}
        </resumeContext.Provider>
    )
}


export const useResume = () =>useContext(resumeContext);