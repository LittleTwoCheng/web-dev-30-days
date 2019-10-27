import React, { useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import TodoList from "./views/TodoList";
import { Typography } from "@material-ui/core";

import useAppReducer, { initialState } from "./reducer";

function App() {
  const [{ items, doneMap, openMap }, dispatch] = useAppReducer(initialState);
  console.log("items", items);
  useEffect(() => {
    dispatch({
      type: "fetchItems"
    });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch({
  //     type: "fetchItems"
  //   });
  // }, [openMap]);

  return (
    <Layout
      header={
        <Typography component="h1" color="inherit">
          Learn Web Dev
        </Typography>
      }
    >
      <TodoList
        items={items}
        doneMap={doneMap}
        openMap={openMap}
        onDone={(item, done) => {
          dispatch({
            type: done ? "done" : "undone",
            key: item.key
          });
        }}
        onOpen={(item, open) => {
          dispatch({
            type: open ? "open" : "close",
            key: item.key
          });
        }}
      />
    </Layout>
  );
}

export default App;
