import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  Box,
  Button,
  Chip,
  IconButton,
  lighten,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { Add, Expand, Height } from "@mui/icons-material";
import { updateColumnWidth } from "~/store/layoutStore";

const AddWidgetInfo = () => {
  const theme = useTheme();
  return (
    <Stack direction="column" spacing={1} alignItems="center">
      <Box
        sx={{
          bgcolor: lighten(theme.palette.secondary.main, 0.9),
          color: theme.palette.secondary.main,
          width: 58,
          height: 58,
          borderRadius: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <Add />
        </IconButton>
      </Box>
      <Typography variant="body2" color="secondary" textAlign="center">
        Glissez un nouveau widget ici
      </Typography>
    </Stack>
  );
};

export function Droppable(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { column, columnIndex, rowIndex, children, widthConfigButton } = props;

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
          borderRadius: 2,
          bgcolor: isOver ? "primary.50" : "transparent",
          border: "2px dashed",
          borderColor: isOver ? "primary.main" : "divider",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {React.Children.count(children) === 0 ? <AddWidgetInfo /> : children}
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
                key={option?.value}
                onClick={() => {
                  updateColumnWidth(rowIndex, columnIndex, option.value);

                  handleClose();
                }}
              >
                {option?.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
}
