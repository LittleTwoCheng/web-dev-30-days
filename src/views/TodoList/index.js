import React from "react";
import { Paper } from "@material-ui/core";
import TodoListItem from "./Item";

function TodoList({ items, doneMap, openMap, onDone, onOpen }) {
  return (
    <Paper style={{ margin: 16, overflow: "scroll" }}>
      {items.map((item, idx) => (
        <TodoListItem
          item={item}
          key={item.key}
          divider={idx !== items.length - 1}
          onCheckBoxToggle={onDone}
          checked={doneMap[item.key]}
          onExpand={onOpen}
          expanded={openMap[item.key]}
        />
      ))}
    </Paper>
  );
}

export default TodoList;
