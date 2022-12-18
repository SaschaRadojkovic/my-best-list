import { useEffect, useState } from "react";
import { uid } from "uid";
import Form from "./Form.js";
import React from "react";
import { blue } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import LoadIcon from "@mui/icons-material/DriveFolderUpload";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import "./index.css";
const initialtodoList = [
  { id: 1, task: "Einkaufen gehen", completed: false },
  { id: 2, task: "Bügeln", completed: false },
  { id: 3, task: "E-Mails beantworten", completed: false },
  { id: 4, task: "Treppe putzen", completed: false },
  { id: 5, task: "Rechnungen bezahlen", completed: false },
];

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default function App() {
  const [adds, setAdds] = useState(initialtodoList);
  //console.log("task", adds);

  function handleAdd(task) {
    setAdds([{ id: uid(), task, completed: false }, ...adds]);
  }

  function handleDone(id) {
    setAdds(
      adds.map((add) => {
        if (add.id === id) {
          return { ...add, completed: !add.completed };
        } else {
          return add;
          //add.id === id ? { ...add, completed: !add.completed } : add
        }
      })
    );
  }

  function handleDelete(id) {
    setAdds(adds.filter((add) => add.id !== id));
    //console.log("x", x);
  }
  function save() {
    localStorage.setItem("data", JSON.stringify(adds));
  }
  function load() {
    const result = JSON.parse(localStorage.getItem("data"));
    setAdds(result);
  }
  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      load();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Do List
          </Typography>
          <IconButton onClick={load}>
            <LoadIcon color="secondary" />
          </IconButton>
          <IconButton onClick={save}>
            <SaveIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Form
        adds={adds}
        onAdd={handleAdd}
        onDone={handleDone}
        onDelete={handleDelete}
      />
    </ThemeProvider>
  );
}
