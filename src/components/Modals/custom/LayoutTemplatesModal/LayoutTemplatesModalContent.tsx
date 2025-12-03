import {
  Stack,
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import { radiusMap } from "~/helpers/radiusMap";
import { MockedTemplates, MockedTemplatesCategories } from "~/mock";
import { applyLayoutTemplate } from "~/store/layoutStore";
import { useModal } from "~/store/modalStore";
import { useThemeMode } from "~/store/themeStore";

export default function LayoutTemplatesModalContent({
  module,
}: {
  module: string;
}) {
  const [currentOrigin, setCurrentOrigin] = React.useState<string>("software");

  const { borderRadius } = useThemeMode();
  const { close: closeTemplateModal } = useModal("templateModal");

  const filteredTemplates = MockedTemplates.filter(
    (template) =>
      template.origin === currentOrigin && template.module === module
  );

  const handleSelectTemplate = (template: (typeof MockedTemplates)[0]) => {
    applyLayoutTemplate(template as any);
    closeTemplateModal();
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Tabs
          value={currentOrigin}
          onChange={(_, newValue) => setCurrentOrigin(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {MockedTemplatesCategories.map((viewType) => (
            <Tab key={viewType.id} value={viewType.id} label={viewType.label} />
          ))}
        </Tabs>
      </Box>

      <Box>
        {filteredTemplates.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Aucun modèle disponible pour cette catégorie.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredTemplates.map((template) => (
              <Grid key={template.id} size={3}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: radiusMap[borderRadius],
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {template.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Stack>
  );
}
