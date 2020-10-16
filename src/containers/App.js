import React, { useState } from "react";
import "../styles/App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { produce } from "immer";
import { connect } from "react-redux";
import dataOfTrello from "./../store/data"

import Col from "../components/Col";

function App(props) {
  const { id, name, tasks } = props.columns;
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
    const _board = produce(board, (draftState) => {
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
    console.log(_board);
    setBoard(_board);
  };
  return (
    <div className="App">
      <header>
        <h1>Trello</h1>
      </header>
      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          {board.columns.map((column) => (
            <Col
              id={id}
              name={name}
              tasks={tasks}
              key={id}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    columns: state.columns,
  };
};
// const mapDispatchToProps = dispatch => ({
//   draged : () => dispatch(drag(result))
// })

export default (mapStateToProps)(App);
