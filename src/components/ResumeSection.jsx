// ResumeSection.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ResumeSection({ id, component: Component, dispatch, permanent}) {
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
      className="bg-white shadow-md p-4 mb-4 rounded-md"
    >
      {/* Actual Section Component */}
      <Component />
      <div className="flex gap-4 justify-end">
 {!permanent && (
          <div>
            <TrashIcon
              className="w-5 h-5 cursor-pointer text-gray-500"
              onClick={() => dispatch({ type: "DELETE_SECTION", payload: id })}
            />
          </div>
        )}
 {/* Drag Handle */}
      <div className="cursor-grab ">
        <div {...attributes} {...listeners}>
          <Bars3Icon className="w-5 h-5  text-gray-500" />
        </div>
      </div>
      </div>
    
    </div>
  );
}
