import React from "react";
import "../styles/App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from "react-redux";

import Col from "../components/Col";
import { onDragEnd } from "./actions";

function App({ columns, draged }) {
  return (
    <div className="App">
      <header>
        <h1>Trello</h1>
      </header>
      <div className="container">
        <DragDropContext onDragEnd={draged}>
          {columns &&
            columns.map((column) => (
              <Col
                id={column.id}
                name={column.name}
                tasks={column.tasks}
                key={column.id}
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
const mapDispatchToProps = (dispatch) => ({
  draged: (result) => dispatch(onDragEnd(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
