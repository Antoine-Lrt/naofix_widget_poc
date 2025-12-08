import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Drawer,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  addWidgetToColumn,
  closeDrawer,
  removeWidgetFromColumn,
  updateLayoutColumns,
  useDevice,
  useDrawer,
  useLayoutStore,
} from "~/store/layoutStore";
import { WidgetsContainer } from "~/components/WidgetsContainer";
import { isEmpty } from "lodash-es";
import React, { useState } from "react";
import {
  Delete,
  Edit,
  KeyboardArrowRight,
  ViewWeek,
  Widgets,
} from "@mui/icons-material";
import { models, modules, viewTypes } from "~/mock";
import { DRAWER_WIDTH } from "~/constant/layoutConstants";
import { useModal } from "~/store/modalStore";
// Importation de DragOverlay pour la correction du z-index
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { radiusMap } from "~/helpers/radiusMap";
import { useThemeMode } from "~/store/themeStore";
import ListDesktopMd from "~/components/widgets/List/desktop/List.desktop.md";
import DrawerWidgetsList from "~/components/widgets/common/DrawerWidgetsList";

export const Route = createFileRoute("/layout_creator")({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
});

const AddWidgetInfo = () => {
  const { borderRadius } = useThemeMode();
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Box
        sx={{
          bgcolor: "background.paper",
          width: 58,
          height: 58,
          borderRadius: radiusMap[borderRadius],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Widgets />
      </Box>
      <Typography variant="body2" color="secondary" textAlign="center">
        Cliquez sur le bouton <strong>Widget</strong> et faites-le glisser votre
        widget ici.
      </Typography>
    </Stack>
  );
};

function RouteComponent() {
  const [columnMenu, setColumnMenu] = React.useState<{
    anchorEl: HTMLElement | null;
    rowIndex: number | null;
  }>({ anchorEl: null, rowIndex: null });

  const [activeId, setActiveId] = useState<string | null>(null);

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

  if (!currentView) return <div>Chargement du layout…</div>;

  const { rows, module, view_type, model_name } = currentView;

  const flexMap = {
    xs: 4,
    sm: 5,
    md: 7,
    lg: 8,
  };

  const currentDevice = useDevice();
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === view_type);
  const currentModel = models.find((m) => m.name === model_name);

  let columnsOptionsMap;
  switch (currentDevice) {
    case "computer":
      columnsOptionsMap = [1, 2, 3, 4];
      break;
    case "tablet":
      columnsOptionsMap = [1, 2, 3];
      break;
    case "mobile":
      columnsOptionsMap = null;
      break;
    default:
      columnsOptionsMap = [1, 2, 3, 4];
  }

  let layoutWidth;
  switch (currentDevice) {
    case "computer":
      layoutWidth = 12;
      break;
    case "tablet":
      layoutWidth = 7;
      break;
    case "mobile":
      layoutWidth = 4;
      break;
    default:
      layoutWidth = 12;
  }

  type FlexWidth = "xs" | "sm" | "md" | "lg";

  function getFlexValue(width: FlexWidth): number {
    return flexMap[width] || 1;
  }
  const drawerIsOpen = useDrawer();
  const { close } = useModal("templateModal");

  const [parent, setParent] = useState<string | null>(null);

  const draggableMarkup = (
    <Box id="list-widget-1">
      <Typography variant="body2" color="text.secondary">
        Faites glisser et déposez les widgets dans l'une des colonnes.
      </Typography>
    </Box>
  );

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    if (over) {
      const columnId = over.id as string;
      const widgetId = active.id as string;
      addWidgetToColumn(columnId, widgetId);
    }

    setParent(over ? (over.id as string) : null);
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    // <DndContext
    //   onDragStart={handleDragStart}
    //   onDragEnd={handleDragEnd}
    //   onDragCancel={handleDragCancel}
    // >
    //   <DragOverlay style={{ zIndex: 9999 }}>
    //     {activeId ? draggableMarkup : null}
    //   </DragOverlay>
    <Stack>
      <Grid container spacing={2} zIndex={2}>
        {rows && !isEmpty(rows)
          ? rows.map((row, rowIndex) => {
              const columnsCount = row.columns.length;
              return (
                <Grid
                  container
                  spacing={1}
                  size={12}
                  key={rowIndex}
                  justifyContent="center"
                >
                  <Grid size={12}>
                    <Box
                      textAlign="center"
                      visibility={
                        currentDevice === "mobile" ? "hidden" : "visible"
                      }
                    >
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
                        onClick={(e) =>
                          handleColumnMenuButtonClick(e, rowIndex)
                        }
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
                  <Grid container size={layoutWidth} flexWrap="nowrap">
                    {row.columns.map((column, columnIndex) => {
                      return (
                        <Grid
                          key={column.id}
                          style={{
                            flex: getFlexValue(column.width ?? "xs"),
                            minWidth: 0,
                          }}
                        >
                          <WidgetsContainer
                            column={column}
                            columnIndex={columnIndex}
                            rowIndex={rowIndex}
                            widthConfigButton={columnsCount > 1}
                          />
                          {/* {column.widgets &&
                              !isEmpty(column.widgets) &&
                              column.widgets.map((widget, index) => {
                                return (
                                  <Card
                                    key={index}
                                    elevation={0}
                                    sx={{
                                      height: "100%",
                                      position: "relative",
                                      overflow: "hidden",
                                      cursor: "pointer",
                                      border: "1px solid",
                                      borderColor: "divider",
                                      transition: "all 0.2s ease",

                                      "&:hover .contentWrapper": {
                                        filter: "blur(4px)",
                                        transform: "scale(1.02)",
                                      },
                                      "&:hover .hoverOverlay": {
                                        opacity: 1,
                                        pointerEvents: "auto",
                                      },
                                    }}
                                  >
                                    <Box
                                      className="contentWrapper"
                                      sx={{
                                        height: "100%",
                                        transition:
                                          "filter 0.2s ease, transform 0.2s ease",
                                      }}
                                    >
                                      <CardContent
                                        sx={{
                                          height: "100%",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {widget.id}
                                      </CardContent>
                                    </Box>

                                    <Box
                                      className="hoverOverlay"
                                      sx={{
                                        position: "absolute",
                                        inset: 0,
                                        opacity: 0,
                                        pointerEvents: "none",
                                        transition: "opacity 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          alert("Editer le widget")
                                        }
                                      >
                                        <Edit />
                                      </IconButton>
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeWidgetFromColumn(
                                            column.id,
                                            widget
                                          )
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Box>
                                  </Card>
                                );
                              })} */}
                          {/* <AddWidgetInfo /> */}

                          {/* {parent === column.id && activeId === null ? (
                              draggableMarkup
                            ) : (
                            )}
                            */}
                          {/* </WidgetsContainer> */}
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Stack>
    // {/* <Drawer
    //   sx={{
    //     width: DRAWER_WIDTH,
    //     flexShrink: 0,
    //     "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
    //   }}
    //   variant="persistent"
    //   slotProps={{ paper: { sx: { bgcolor: "background.default" } } }}
    //   anchor="right"
    //   open={drawerIsOpen}
    // >
    //   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    //     <IconButton
    //       sx={{
    //         "&:hover": {
    //           bgcolor: "transparent",
    //           color: "primary.main",
    //         },
    //       }}
    //       onClick={closeDrawer}
    //     >
    //       <KeyboardArrowRight />
    //     </IconButton>
    //     <Typography variant="h6">Widgets</Typography>
    //   </Box>
    //   <Box p={2}>
    //     <Typography variant="body2" color="text.secondary">
    //       Faites glisser et déposez les widgets dans l'une des colonnes.
    //     </Typography>
    //   </Box>
    //   <Box>
    //     <DrawerWidgetsList widgets={draggableMarkup} />
    //   </Box>
    //   <Box p={2}>{parent === null ? draggableMarkup : null}</Box>
    // </Drawer> */}
    // </DndContext>
  );
}
