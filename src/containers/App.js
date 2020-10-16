import React, { useState } from "react";
import "../styles/App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { produce } from "immer";

import Col from "../components/Col";

const dataOfTrello = {
  columns: [
    {
      id: 1,
      name: "todo tasks",
      tasks: [
        { id: 1, task: "Go to gym", status: "not completed" },
        { id: 2, task: "Go to concert", status: "not completed" },
        { id: 3, task: "Go to pool", status: "not completed" },
        { id: 4, task: "Go to school", status: "not completed" },
      ],
    },
    {
      id: 2,
      name: "compeleted tasks",
      tasks: [
        { id: 5, task: "Go to club", status: "not completed" },
        { id: 6, task: "Go to stadium", status: "not completed" },
        { id: 7, task: "Go to library", status: "not completed" },
        { id: 8, task: "Go to university", status: "not completed" },
      ],
    },
  ],
};

function App() {
  const [board, setBoard] = useState(dataOfTrello);
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const taskId = draggableId.split("-")[1];
    const columnId = source.droppableId.split("-")[1];
    const sourceColumnIndex = board.columns.findIndex(
      (col) => col.id === Number(columnId)
    );
    const sourceTaskIndex = board.columns[sourceColumnIndex].tasks.findIndex(
      (t) => t.id === Number(taskId)
    );
    const destinationColumnIndex = board.columns.findIndex(
      (col) => col.id === Number(destination.droppableId.split("-")[1])
    );
    const destinationTaskIndex = destination.index;
    const _board = produce(board, draftState => {
      const selectedTask = draftState.columns[sourceColumnIndex].tasks.splice(
        sourceTaskIndex,
        1
      );
      draftState.columns[destinationColumnIndex].tasks.splice(
        destinationTaskIndex,
        1,
        selectedTask
      );
    });
    console.log(_board)
    setBoard(_board);
    // const column = board.columns[source.droppableId];
    // const newTasksIds = Array.from(column.taskIds);
    // newTasksIds.splice(source.index, 1);
    // newTasksIds.splice(destination.index, 0, draggableId);
    // const newColumn = {
    //   ...column,
    //   tasksId: newTasksIds,
    // };
    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.state.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // };
    // this.setState(mewState);
  };
  return (
    <div className="App">
      <header>
        <h1>Trello</h1>
      </header>
      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          {board.columns.map((column) => (
            <Col id={column.id} name={column.name} tasks={column.tasks} key={column.id} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
