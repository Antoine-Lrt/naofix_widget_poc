import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { Add, Height, ViewModule, Widgets } from "@mui/icons-material";
import { LayoutColumn, updateColumnWidth } from "~/store/layoutStore";
import { radiusMap } from "~/helpers/radiusMap";
import { useThemeMode } from "~/store/themeStore";
import { useModal } from "~/store/modalStore";
import { getColumnsWidthOptionsMap } from "~/utils/getColumnsWidthOptionsMap";

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

export function WidgetsContainer({
  column,
  columnIndex,
  rowIndex,
  children,
  widthConfigButton,
}: DroppableProps) {
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
        {children}
      </Box>

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
