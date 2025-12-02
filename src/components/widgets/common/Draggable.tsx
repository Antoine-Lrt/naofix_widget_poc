import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Paper } from "@mui/material";

interface DraggableProps {
  id: string;
  children: ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
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
      {children}
    </Paper>
  );
}
