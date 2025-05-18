import { useReducer } from "react";
import { resumeReducer, initialSections } from "../reducer/ResumeBuilder";
import AddMore from './Resume/AddMore'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import ResumeSection from "./ResumeSection";

export default function ResumeBuilder() {
  const [sections, dispatch] = useReducer(resumeReducer, initialSections);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      const newArray = arrayMove(sections, oldIndex, newIndex);
      dispatch({ type: "REORDER_SECTIONS", payload: newArray });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Resume Sections</h2>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {sections.map((section) => {
            const Component = section.component;
            return <ResumeSection key={section.id} id={section.id} component={Component} dispatch={dispatch} permanent={section.permanent}/>;
          })

          }
          
        </SortableContext>
         <AddMore dispatch={dispatch}/>
      </DndContext>
    </div>
  );
}
