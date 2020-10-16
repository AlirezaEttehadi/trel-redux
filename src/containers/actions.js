import { DRAG_END_ACTION } from "./constants";

export const onDragEnd = (data) => {
  return {
    type: DRAG_END_ACTION,
    data,
  };
};
