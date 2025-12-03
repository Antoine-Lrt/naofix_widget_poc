import {
  Box,
  Tabs,
  Tab,
  Stack,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { radiusMap } from "~/helpers/radiusMap";
import { MockedWidgetsTypes, WidgetsList } from "~/mock";
import { addWidgetToColumn } from "~/store/layoutStore";
import { useModal } from "~/store/modalStore";
import { useThemeMode } from "~/store/themeStore";

export default function WidgetModalContent() {
  const [currentType, setCurrentType] = React.useState<string>("list");
  console.log(
    "🚀 ~ WidgetModalContent.tsx:19 ~ WidgetModalContent ~ currentType:",
    currentType
  );

  const widthOrder: Record<"xs" | "sm" | "md" | "lg", number> = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  };

  const { borderRadius } = useThemeMode();

  const { detail, close: closeWidgetsModal } = useModal<{
    rowIndex: number;
    columnIndex: number;
    columnId: string;
    width?: "xs" | "sm" | "md" | "lg";
  }>("widgetsModal");

  const filteredWidgets = WidgetsList.filter((widget) => {
    const widgetMinWidth = widget.min_width as "xs" | "sm" | "md" | "lg";
    const columnWidth = detail?.width ?? "xs";

    return (
      widget.widget_type === currentType &&
      widthOrder[columnWidth] >= widthOrder[widgetMinWidth]
    );
  });

  const handleSelectWidget = (widget) => {
    if (!detail) return;

    addWidgetToColumn(detail.columnId, widget);

    closeWidgetsModal();
  };
  return (
    <Stack spacing={2}>
      <Box>
        <Tabs
          value={currentType}
          onChange={(_, newValue) => setCurrentType(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {MockedWidgetsTypes.map((widgetType) => (
            <Tab
              key={widgetType.id}
              value={widgetType.id}
              label={widgetType.label}
            />
          ))}
        </Tabs>
      </Box>

      <Box>
        {filteredWidgets.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Aucun modèle disponible pour cette catégorie.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredWidgets.map((widget) => (
              <Grid key={widget.id} size={3}>
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
                  onClick={() => handleSelectWidget(widget)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {widget.id}
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
