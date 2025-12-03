/// <reference types="vite/client" />
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useMatchRoute,
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
import {
  LayoutTemplatesModal,
  WarningWidgetsModal,
  WidgetsModal,
} from "~/components/Modals/custom";

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
});

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
  const { close: closeTemplateModal } = useModal("templateModal");
  const { close: closeWidgetsModal } = useModal("widgetsModal");
  const { currentView } = useLayoutStore();
  const { module = "", view_type = "" } = currentView || {};

  const matchRoute = useMatchRoute();
  const isLayoutCreator = matchRoute({ to: "/layout_creator" });

  React.useEffect(() => {
    if (!isLayoutCreator) {
      closeDrawer();
    }
  }, [isLayoutCreator]);

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0 }}>
        <Providers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header drawerIsOpen={drawerIsOpen} />
            <Divider />

            <Stack
              px={10}
              component="main"
              sx={{
                flex: 1,
                flexGrow: 1,
                transition: "margin-right 0.3s",
                paddingBlock: 4,
                mr: drawerIsOpen ? `${DRAWER_WIDTH}` : 0,
              }}
            >
              {children}
            </Stack>

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
          <LayoutTemplatesModal module={module} />
          <WidgetsModal />
          <WarningWidgetsModal />
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
