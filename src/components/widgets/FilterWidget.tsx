import React from "react";
import { apiStore, useWidget } from "~/store/layoutApiStore";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";

interface FilterWidgetProps {
  id: string;
}

export function GenericFilterWidget({ id }: FilterWidgetProps) {
  const widget = useWidget(id);
  const [localFilters, setLocalFilters] = React.useState({});

  if (!widget || !widget.filters) return null;

  const applyOption = (filterType: string, value: string | null) => {
    const newFilters = { ...localFilters };
    if (value === null) delete newFilters[filterType];
    else newFilters[filterType] = value;

    setLocalFilters(newFilters);

    apiStore.setState((prev) => {
      const newWidgets = prev.view.widgets.map((w) =>
        w.id === widget.targetWidgetId ? { ...w, filters: newFilters } : w
      );
      return { ...prev, view: { widgets: newWidgets } };
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      {widget.filters.map((f: any) => (
        <Box key={f.filterType} mb={2}>
          <Typography variant="subtitle2">{f.label}</Typography>
          <List>
            {f.options.map((option: any) => (
              <ListItem key={option.value}>
                <ListItemButton
                  onClick={() => applyOption(f.filterType, option.value)}
                >
                  {option.label}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Paper>
  );
}
