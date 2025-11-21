import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  updateLayoutColumns,
  updateLayoutRows,
  useLayoutStore,
} from "~/store/layoutStore";
import { Draggable } from "~/components/Draggable";
import { Droppable } from "~/components/Droppable";
import { isEmpty, map } from "lodash";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { currentView } = useLayoutStore();

  const [positions, setPositions] = useState<Record<string, string | null>>({
    "widget-1": null,
    "widget-2": null,
    "widget-3": null,
  });

  if (!currentView) return <div>Chargement du layout…</div>;

  const { rows } = currentView;

  const widgets = ["widget-1", "widget-2", "widget-3"];

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const flexMap = {
    xs: 4,
    sm: 5,
    md: 7,
    lg: 8,
  };

  function getFlexValue(width) {
    return flexMap[width] || 1;
  }

  return (
    <>
      <FormControl size="small" sx={{ mb: 2, width: 150 }}>
        <InputLabel>Lignes</InputLabel>
        <Select
          label="Colonnes"
          value={rows ? rows.length : 0}
          onChange={(e) => updateLayoutRows(Number(e.target.value))}
        >
          <MenuItem value={1}>1 ligne</MenuItem>
          <MenuItem value={2}>2 lignes</MenuItem>
          <MenuItem value={3}>3 lignes</MenuItem>
          <MenuItem value={4}>4 lignes</MenuItem>
          <MenuItem value={5}>5 lignes</MenuItem>
          <MenuItem value={6}>6 lignes</MenuItem>
        </Select>
      </FormControl>

      <DndContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {rows && !isEmpty(rows)
            ? rows.map((row, rowIndex) => {
                return (
                  <Grid container size={12} key={rowIndex}>
                    <Grid size={12}>
                      <FormControl size="small" sx={{ mb: 2, width: 150 }}>
                        <InputLabel>Colonnes</InputLabel>
                        <Select
                          label="Colonnes"
                          value={row.columns ? row.columns.length : 0}
                          onChange={(e) =>
                            updateLayoutColumns(
                              rowIndex,
                              Number(e.target.value)
                            )
                          }
                        >
                          <MenuItem value={1}>1 colonne</MenuItem>
                          <MenuItem value={2}>2 colonnes</MenuItem>
                          <MenuItem value={3}>3 colonnes</MenuItem>
                          <MenuItem value={4}>4 colonnes</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid container size={12} flexWrap="nowrap">
                      {row.columns.map((column, columnIndex) => (
                        <Grid
                          key={column.id}
                          style={{
                            flex: getFlexValue(column.width),
                            minWidth: 0,
                          }}
                        >
                          <Droppable
                            column={column}
                            columnIndex={columnIndex}
                            rowIndex={rowIndex}
                          >
                            {column.widgets.map((widget) => (
                              <Draggable key={widget} id={widget}>
                                {widget}
                              </Draggable>
                            ))}
                          </Droppable>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </DndContext>
    </>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    setPositions((prev) => ({
      ...prev,
      [active.id]: over.id,
    }));
  }
}
