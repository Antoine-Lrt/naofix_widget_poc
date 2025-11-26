/// <reference types="vite/client" />
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { CacheProvider } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import createCache from "@emotion/cache";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import React from "react";
import { getTheme } from "~/setup/theme";
import { Header } from "~/components/Header";
import { useThemeMode } from "~/store/themeStore";
import {
  applyLayoutTemplate,
  closeDrawer,
  useDrawer,
  useLayoutStore,
} from "~/store/layoutStore";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Draggable } from "~/components/Draggable";
import { DndContext } from "@dnd-kit/core";
import { DRAWER_WIDTH } from "~/constant/layoutConstants";
import DefaultModal from "~/components/Modals/DefaultModal";
import { useModal } from "~/store/modalStore";
import {
  MockedTemplates,
  MockedTemplatesCategories,
  modules,
  viewTypes,
} from "~/mock";
import { radiusMap } from "~/helpers/radiusMap";

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
});

function TemplateLayoutModalTitle({
  module,
  viewType,
}: {
  module: string;
  viewType: string;
}) {
  console.log(
    "🚀 ~ __root.tsx:61 ~ TemplateLayoutModalTitle ~ viewType:",
    viewType
  );
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === viewType);
  return (
    <Box>
      <Typography variant="h6">Modèles pour {currentModule?.label}</Typography>
      <Typography variant="body2" color="text.secondary">
        {currentType?.label}
      </Typography>
    </Box>
  );
}
function TemplateLayoutModalContent({
  module,
  viewType,
}: {
  module: string;
  viewType: string;
}) {
  const [currentOrigin, setCurrentOrigin] = React.useState<string>("software");

  const { borderRadius } = useThemeMode();
  const { close } = useModal("templateModal");

  const filteredTemplates = MockedTemplates.filter(
    (template) =>
      template.origin === currentOrigin &&
      template.module === module &&
      template.view_type === viewType
  );

  const handleSelectTemplate = (template: (typeof MockedTemplates)[0]) => {
    applyLayoutTemplate(template);
    close();
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

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: "css" });
  const { mode } = useThemeMode();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const drawerIsOpen = useDrawer();
  const { close } = useModal("templateModal");
  const { currentView } = useLayoutStore();
  const { module, view_type } = currentView;
  const draggableMarkup = (
    <>
      <Draggable id="widget-1">Widget 1</Draggable>
      <Draggable id="widget-2">Widget 2</Draggable>
      <Draggable id="widget-3">Widget 3</Draggable>
    </>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    // setPositions((prev) => ({
    //   ...prev,
    //   [active.id]: over.id,
    // }));
  }

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0 }}>
        <Providers>
          <DndContext onDragEnd={handleDragEnd}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header drawerIsOpen={drawerIsOpen} />
              <Divider />

              <Container
                component="main"
                sx={{
                  flexGrow: 1,
                  paddingBlock: 4,
                  mr: drawerIsOpen ? `${DRAWER_WIDTH}` : "auto",
                }}
              >
                {children}
              </Container>

              <Box component="footer" sx={{ mt: "auto", py: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  ©2025 NaoFix
                </Typography>
              </Box>
            </Box>

            <Drawer
              sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
              }}
              variant="persistent"
              slotProps={{ paper: { sx: { bgcolor: "background.default" } } }}
              anchor="right"
              open={drawerIsOpen}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  sx={{
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                  onClick={closeDrawer}
                >
                  <KeyboardArrowRight />
                </IconButton>
                <Typography variant="h6">Widgets</Typography>
              </Box>
            </Drawer>
          </DndContext>
          <DefaultModal
            id="templateModal"
            size="lg"
            modalDetail={{
              title: (
                <TemplateLayoutModalTitle
                  module={module}
                  viewType={view_type}
                />
              ),
              content: (
                <TemplateLayoutModalContent
                  module={module}
                  viewType={view_type}
                />
              ),
              actions: [
                {
                  label: "Fermer",
                  onClick: close,
                },
              ],
            }}
          />
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
