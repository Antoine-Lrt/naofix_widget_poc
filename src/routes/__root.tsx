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
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import createCache from "@emotion/cache";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import React from "react";
import { getTheme } from "~/setup/theme";
import { Header } from "~/components/Header";
import { useThemeMode } from "~/store/themeStore";
import { closeDrawer, useDrawer } from "~/store/layoutStore";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Draggable } from "~/components/Draggable";
import { DndContext } from "@dnd-kit/core";
import { DRAWER_WIDTH } from "~/constant/layoutConstants";

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
  const isOpen = useDrawer();
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
              <Header drawerIsOpen={isOpen} />
              <Divider />

              <Container
                component="main"
                sx={{
                  flexGrow: 1,
                  paddingBlock: 4,
                  mr: isOpen ? `${DRAWER_WIDTH}` : "auto",
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
              open={isOpen}
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
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
