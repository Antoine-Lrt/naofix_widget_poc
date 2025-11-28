import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box, Chip, Menu, MenuItem, Stack, Typography } from "@mui/material";

import { Height, Widgets } from "@mui/icons-material";
import { updateColumnWidth } from "~/store/layoutStore";
import { radiusMap } from "~/helpers/radiusMap";
import { useThemeMode } from "~/store/themeStore";

// Typage des props
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

export function Droppable({
  column,
  columnIndex,
  rowIndex,
  children,
  widthConfigButton,
}: DroppableProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { borderRadius } = useThemeMode();

  const widthOptionsMap = {
    xs: { label: "Étroite", value: "xs" },
    sm: { label: "Petite", value: "sm" },
    md: { label: "Moyenne", value: "md" },
    lg: { label: "Large", value: "lg" },
  };

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Stack spacing={1}>
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
