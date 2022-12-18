import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Form({ adds, onAdd, onDone, onDelete }) {
  const [text, setText] = React.useState("");
  const onChange = (event) => {
    setText(event.target.value);
  };
  const onKeyDown = (event) => {
    if (event.code === "Enter") {
      onAdd(text);
      setText("");
    }
  };

  //console.log("render form");
  return (
    <>
      <Stack spacing={2} direction="row">
        <TextField
          onKeyPress={onKeyDown}
          fullWidth
          onChange={onChange}
          value={text}
          id="standard-basic"
          label="NEW TO DO"
          variant="standard"
          style={{ marginLeft: 10 }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            onAdd(text);
            setText("");
          }}
        >
          Add
        </Button>
      </Stack>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {adds.map(({ id, task, completed }) => {
          //console.log("mit", id, task, completed, deleteItem);
          return (
            <ListItem
              style={{ textDecoration: completed ? "line-through" : "none" }}
              key={id}
              secondaryAction={
                <IconButton
                  onClick={() => onDelete(id)}
                  edge="end"
                  aria-label="comments"
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => onDone(id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": task }}
                  />
                </ListItemIcon>
                <ListItemText primary={task} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
