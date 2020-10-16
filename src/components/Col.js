import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/Col.css";

function Col({ id, name, tasks }) {
  return (
    <Droppable droppableId={`droppable-${id}`} type="PERSON">
      {(provided, snapshot) => (
        <div
          className="column"
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
          {...provided.droppableProps}
        >
          <h2>{name}</h2>
          {tasks.map((task, index) => (
            <Draggable
              draggableId={`draggable-${task.id}`}
              index={index}
              key={task.id}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h4 className="task" key={task.id}>
                    {task.task}
                  </h4>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
}

export default Col;
