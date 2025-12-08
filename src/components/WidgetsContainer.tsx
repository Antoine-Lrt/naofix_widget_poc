import React, { ReactNode, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Box, Chip, Menu, MenuItem, Stack, Typography } from "@mui/material";

import { Add, Height } from "@mui/icons-material";
import { LayoutColumn, updateColumnWidth } from "~/store/layoutStore";
import { radiusMap } from "~/helpers/radiusMap";
import { useThemeMode } from "~/store/themeStore";
import { useModal } from "~/store/modalStore";
import { getColumnsWidthOptionsMap } from "~/utils/getColumnsWidthOptionsMap";
import ListDesktopMd from "./widgets/List/catalog/desktop/List.desktop.md";
interface DroppableProps {
  column: {
    id: string;
    widgets: string[];
    width?: "xs" | "sm" | "md" | "lg";
  };
  columnIndex: number;
  rowIndex: number;
  children?: ReactNode;
  widthConfigButton?: boolean;
}

interface SortableItemProps {
  id: string | number;
}

export function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <ListDesktopMd id={props.id} />
    </div>
  );
}

export function WidgetsContainer({
  column,
  columnIndex,
  rowIndex,
  children,
  widthConfigButton,
}: DroppableProps) {
  const [items, setItems] = useState([1, 2, 3]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentColumInfos, setCurrentColumInfos] = React.useState<null | {
    id: string;
    width?: "xs" | "sm" | "md" | "lg";
  }>(null);
  const open = Boolean(anchorEl);

  const { open: openWidgetsModal } = useModal("widgetsModal");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { borderRadius } = useThemeMode();

  const widthOptionsMap = getColumnsWidthOptionsMap(rowIndex);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleOpenWidgetsModal = (
    e: React.MouseEvent<HTMLElement>,
    column: LayoutColumn
  ) => {
    openWidgetsModal({
      rowIndex,
      columnIndex,
      columnId: column.id,
      width: column.width,
    });
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Chip
            id="add-widget-button"
            clickable
            label="Ajouter un widget"
            size="small"
            aria-controls="basic-menu"
            aria-haspopup="true"
            onClick={(event) => handleOpenWidgetsModal(event, column)}
            icon={<Add />}
            sx={{
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="caption"
            margin={0}
            color="secondary"
            lineHeight={0}
          >
            {column.widgets.length} widgets
          </Typography>
        </Box>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <Box
          ref={setNodeRef}
          sx={{
            minHeight: 400,
            p: 2.5,
            borderRadius: radiusMap[borderRadius],
            bgcolor: isOver ? "primary.50" : "transparent",
            border: "2px dashed",
            borderColor: isOver ? "primary.main" : "divider",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
        </Box>
      </DndContext>

      {widthConfigButton && (
        <>
          <Box display="flex" justifyContent="center">
            <Chip
              id="width-button"
              clickable
              label={
                column.width && widthOptionsMap[column.width]
                  ? widthOptionsMap[column.width].label
                  : "Width"
              }
              size="small"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              icon={<Height sx={{ rotate: "90deg" }} />}
            />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            {Object.values(widthOptionsMap).map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  updateColumnWidth(
                    rowIndex,
                    columnIndex,
                    option.value as "xs" | "sm" | "md" | "lg"
                  );
                  handleClose();
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
}
