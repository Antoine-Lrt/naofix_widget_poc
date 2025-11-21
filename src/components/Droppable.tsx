import React from "react";
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

import { Add, Expand, Height } from "@mui/icons-material";
import { updateColumnWidth } from "~/store/layoutStore";

export function Droppable(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { column, columnIndex, rowIndex, children } = props;
  console.log("🚀 ~ Droppable.tsx:28 ~ Droppable ~ column:", column);

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
        <Typography variant="body1" margin={0} lineHeight={0.5}>
          {columnIndex + 1} colonnes
        </Typography>
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
          borderRadius: 2,
          bgcolor: isOver ? "primary.50" : "transparent",
          border: "2px dashed",
          borderColor: isOver ? "primary.main" : "divider",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {React.Children.count(children) === 0 ? (
          <Typography variant="h6">Drop here</Typography>
        ) : (
          children
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <Chip
          id="width-button"
          clickable
          label={widthOptionsMap[column.width].label}
          size="small"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          icon={
            <Height
              sx={{
                rotate: "90deg",
              }}
            />
          }
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
              updateColumnWidth(rowIndex, columnIndex, option.value);

              handleClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
}
