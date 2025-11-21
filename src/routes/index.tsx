import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Typography textAlign="center" variant="h1">
      Bienvenu sur NaoFix
    </Typography>
  );
}
