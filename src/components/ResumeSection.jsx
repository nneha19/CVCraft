// ResumeSection.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ResumeSection({
  id,
  component: Component,
  dispatch,
  permanent,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-md p-4 mb-4 rounded-md  cursor-grab"
      {...attributes}
      {...listeners}
    >
      <Component />
    </div>
  );
}
