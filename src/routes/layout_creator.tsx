import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { useState } from "react";
import { Box, Chip, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { updateLayoutColumns, useLayoutStore } from "~/store/layoutStore";
import { Draggable } from "~/components/Draggable";
import { Droppable } from "~/components/Droppable";
import { isEmpty } from "lodash-es";
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
  const [columnMenu, setColumnMenu] = React.useState<{
    anchorEl: HTMLElement | null;
    rowIndex: number | null;
  }>({ anchorEl: null, rowIndex: null });

  const handleColumnMenuButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => {
    setColumnMenu({ anchorEl: event.currentTarget, rowIndex });
  };

  const handleColumnMenuButtonClose = () => {
    setColumnMenu({ anchorEl: null, rowIndex: null });
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

  const flexMap = {
    xs: 4,
    sm: 5,
    md: 7,
    lg: 8,
  };

  const columnsOptionsMap = [1, 2, 3, 4];
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === view_type);

  type FlexWidth = "xs" | "sm" | "md" | "lg";

  function getFlexValue(width: FlexWidth): number {
    return flexMap[width] || 1;
  }

  return (
    <Grid container spacing={2}>
      <Grid>
        <Typography variant="h3" fontWeight="bolder">
          {currentModule ? currentModule.label.toLocaleUpperCase() : "Module"}
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
      {rows && !isEmpty(rows)
        ? rows.map((row, rowIndex) => {
            console.log(
              "🚀 ~ layout_creator.tsx:85 ~ RouteComponent ~ row:",
              row
            );

            const columnsCount = row.columns.length;
            return (
              <Grid container spacing={1} size={12} key={rowIndex}>
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
                      aria-controls={
                        columnMenu.anchorEl ? "column-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={Boolean(columnMenu.anchorEl)}
                      onClick={(e) => handleColumnMenuButtonClick(e, rowIndex)}
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
                      anchorEl={columnMenu.anchorEl}
                      open={Boolean(columnMenu.anchorEl)}
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
                            onClick={() => {
                              if (columnMenu.rowIndex !== null) {
                                updateLayoutColumns(
                                  columnMenu.rowIndex,
                                  option
                                );
                                handleColumnMenuButtonClose();
                              }
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
                          flex: getFlexValue(column.width ?? "xs"),
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
