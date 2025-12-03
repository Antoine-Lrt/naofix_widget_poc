import { Box, Typography } from "@mui/material";
import React from "react";
import { modules } from "~/mock";

export default function LayoutTemplatesModalTitle({
  module,
}: {
  module: string;
}) {
  const currentModule = modules.find((m) => m.name === module);
  return (
    <Box>
      <Typography variant="h6">Modèles pour {currentModule?.label}</Typography>
    </Box>
  );
}
