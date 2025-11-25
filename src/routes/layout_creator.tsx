import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";
import { Box, Chip, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { updateLayoutColumns, useLayoutStore } from "~/store/layoutStore";
import { Draggable } from "~/components/Draggable";
import { Droppable } from "~/components/Droppable";
import { isEmpty } from "lodash";
import React from "react";
import { ViewWeek } from "@mui/icons-material";
import { modules, viewTypes } from "~/mock";

export const Route = createFileRoute("/layout_creator")({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const columnMenuOpen = Boolean(columnMenuAnchorEl);

  const handleColumnMenuButtonClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };
  const handleColumnMenuButtonClose = () => {
    setColumnMenuAnchorEl(null);
  };
  const { currentView } = useLayoutStore();

  // const [positions, setPositions] = useState<Record<string, string | null>>({
  //   "widget-1": null,
  //   "widget-2": null,
  //   "widget-3": null,
  // });

  // const widgets = ["widget-1", "widget-2", "widget-3"];

  // const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  if (!currentView) return <div>Chargement du layout…</div>;

  const { rows, module, view_type } = currentView;
  console.log("🚀 ~ layout_creator.tsx:60 ~ RouteComponent ~ module:", module);

  const flexMap = {
    xs: 4,
    sm: 5,
    md: 7,
    lg: 8,
  };

  const columnsOptionsMap = [1, 2, 3, 4];
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === view_type);

  function getFlexValue(width) {
    return flexMap[width] || 1;
  }

  return (
    <Grid container spacing={2}>
      {rows && !isEmpty(rows)
        ? rows.map((row, rowIndex) => {
            const columnsCount = row.columns.length;
            return (
              <Grid container spacing={1} size={12} key={rowIndex}>
                <Grid>
                  <Typography variant="h3" fontWeight="bolder">
                    {currentModule
                      ? currentModule.label.toLocaleUpperCase()
                      : "Module"}
                  </Typography>
                  {currentType && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textTransform="uppercase"
                      lineHeight={0.5}
                    >
                      NOUVELLE VUE DE {currentType?.label}
                    </Typography>
                  )}
                </Grid>
                <Grid size={12}>
                  <Box textAlign="center">
                    <Chip
                      id="row-selector-button"
                      clickable
                      label={
                        row.columns.length
                          ? `${row.columns.length} Colonnes`
                          : "Colonnes"
                      }
                      size="small"
                      aria-controls={columnMenuOpen ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={columnMenuOpen ? "true" : undefined}
                      onClick={handleColumnMenuButtonClick}
                      icon={<ViewWeek />}
                      sx={{
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "secondary",
                        },
                      }}
                    />
                    <Menu
                      id="row-select-menu"
                      anchorEl={columnMenuAnchorEl}
                      open={columnMenuOpen}
                      onClose={handleColumnMenuButtonClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      {columnsOptionsMap &&
                        columnsOptionsMap.map((option, index) => (
                          <MenuItem
                            key={index}
                            data-value={option}
                            onClick={(e) => {
                              const value = e.currentTarget.dataset.value;
                              updateLayoutColumns(
                                rowIndex,
                                Number(e.currentTarget.dataset.value)
                              );
                              handleColumnMenuButtonClose();
                            }}
                          >
                            {option} Colonnes
                          </MenuItem>
                        ))}
                    </Menu>
                  </Box>
                </Grid>
                <Grid container size={12} flexWrap="nowrap">
                  {row.columns.map((column, columnIndex) => {
                    return (
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
                          widthConfigButton={columnsCount > 1}
                        >
                          {column.widgets.map((widget) => (
                            <Draggable key={widget} id={widget}>
                              {widget}
                            </Draggable>
                          ))}
                        </Droppable>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
}
