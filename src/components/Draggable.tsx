import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Paper } from "@mui/material";
import { listeners } from "process";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Paper
      ref={setNodeRef}
      sx={{ ...style, p: 2.5, borderRadius: 2 }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </Paper>
  );
}
