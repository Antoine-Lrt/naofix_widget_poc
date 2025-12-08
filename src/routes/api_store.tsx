import { Grid, Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useWidget, useWidgets } from "~/store/layoutApiStore";
import { GenericFilterWidget } from "~/components/widgets/FilterWidget";
import { GenericListWidget } from "~/components/widgets/GenericListWidget";
import { useWidgetData } from "~/services/hooks/useWidgetData";
import { GenericDetailsWidget } from "~/components/widgets/GenericDetailsWidget";

export const Route = createFileRoute("/api_store")({
  component: RouteComponent,
});

export function RouteComponent() {
  const widgets = useWidgets();

  return (
    <Grid container spacing={4} padding={4}>
      {widgets.map((widget) => {
        if (widget.type === "filter") {
          return (
            <Grid size={4} key={widget.id}>
              <GenericFilterWidget id={widget.id} />
            </Grid>
          );
        }

        if (widget.type === "list") {
          return (
            <Grid size={4} key={widget.id}>
              <GenericListWidget id={widget.id} />
            </Grid>
          );
        }

        if (widget.type === "detail") {
          return (
            <Grid size={4} key={widget.id}>
              <GenericDetailsWidget id={widget.id} />
            </Grid>
          );
        }

        return null;
      })}
    </Grid>
  );
}
