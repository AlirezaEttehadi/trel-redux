import { produce } from "immer";
import dataOfTrello from "../store/data";
import { DRAG_END_ACTION } from "./constants";
function reducer(state = dataOfTrello, action) {
  switch (action.type) {
    case DRAG_END_ACTION: {
      const { data } = action;
      const taskId = data.draggableId.split("-")[1];
      const columnId = data.source.droppableId.split("-")[1];
      const sourceColumnIndex = state.columns.findIndex(
        (col) => col.id === Number(columnId)
      );
      const sourceTaskIndex = state.columns[sourceColumnIndex].tasks.findIndex(
        (t) => t.id === Number(taskId)
      );
      const destinationColumnIndex = state.columns.findIndex(
        (col) => col.id === Number(data.destination.droppableId.split("-")[1])
      );
      const destinationTaskIndex = data.destination.index;
      const _board = produce(state, (draftState) => {
        const selectedTask = draftState.columns[sourceColumnIndex].tasks.splice(
          sourceTaskIndex,
          1
        )[0];
        draftState.columns[destinationColumnIndex].tasks.splice(
          destinationTaskIndex,
          0,
          selectedTask
        );
      });
      return _board;
    }
    default:
      return state;
  }
}

export default reducer;
