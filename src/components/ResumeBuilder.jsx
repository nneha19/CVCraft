import { useResume } from "../context/ResumeContext";
import { initialSections } from "../config/dragSection";
import { useMemo, useState } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ResumeSection from "./ResumeSection";

export default function ResumeBuilder() {
  const { state, dispatch } = useResume();

  const sensors = useSensors(useSensor(PointerSensor));

  const sectionOrder = state.sectionOrder;

  const visibleSections = useMemo(() => {
    return sectionOrder
      .map((id) => initialSections.find((s) => s.id === id))
      .filter(
        (section) =>
          section &&
          (section.permanent || state.sectionVisibility?.[section.id])
      );
  }, [sectionOrder, state.sectionVisibility]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id);
    const newIndex = sectionOrder.indexOf(over.id);
    const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);

    dispatch({ type: "SET_SECTION_ORDER", payload: newOrder });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold dark:text-white text-slate-800 text-center mb-6">
        <span className="inline-block border-b-4 border-indigo-400 pb-1 text-2xl sm:text-xl md:text-3xl font-semibold text-center mx-auto">
          CUSTOMIZE THE SEQUENCE
        </span>
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleSections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {visibleSections.map((section) => {
            const Component = section.component;
            return (
              <ResumeSection
                key={section.id}
                id={section.id}
                component={Component}
                dispatch={() => {}}
                permanent={section.permanent}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
