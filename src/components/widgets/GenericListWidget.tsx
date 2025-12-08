import React from "react";
import { useWidget, apiStore } from "~/store/layoutApiStore";
import { useWidgetData } from "~/services/hooks/useWidgetData";
import { List, ListItem, Button, Paper, Box } from "@mui/material";

interface ListWidgetProps {
  id: string;
}

export function GenericListWidget({ id }: ListWidgetProps) {
  const widget = useWidget(id);
  const { data, isLoading, error } = useWidgetData(widget!);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur</div>;

  return (
    <Paper>
      {data && Array.isArray(data) ? (
        <List
          dense
          sx={{
            maxHeight: "600px",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(120, 120, 120, 0.4)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(120, 120, 120, 0.6)",
            },
          }}
        >
          {data?.map((item: any) => (
            <ListItem key={item.url || item.id || item.name}>
              <Button
                onClick={() => {
                  if (widget?.linkedDetailId) {
                    apiStore.setState((prev) => {
                      const newWidgets = prev.view.widgets.map((w) =>
                        w.id === widget.linkedDetailId
                          ? {
                              ...w,
                              selectedId: item.id,
                            }
                          : w
                      );
                      return { ...prev, view: { widgets: newWidgets } };
                    });
                  }
                }}
              >
                {item.originalTitle || item.title || item.name}
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box>No data available</Box>
      )}
    </Paper>
  );
}
