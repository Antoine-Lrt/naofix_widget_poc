import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  css,
  styled,
} from "@mui/material";
import { CustomLink } from "./CustomLink";
import {
  ViewStream,
  ViewModule,
  SaveOutlined,
  Visibility,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

import { toggleThemeMode, useThemeMode } from "~/store/themeStore";
import React from "react";
import {
  openDrawer,
  closeDrawer,
  updateLayoutModule,
  updateLayoutRows,
  updateLayoutViewType,
  useLayoutStore,
  usePreviewMode,
  useDrawer,
} from "~/store/layoutStore";
import { useMatchRoute } from "@tanstack/react-router";
import { modules, viewTypes } from "~/mock";
import { DRAWER_WIDTH } from "~/constant/layoutConstants";
import { useModal } from "~/store/modalStore";

const StyledCustomLink = styled(CustomLink)(
  ({ theme, disabled }) => css`
    color: ${disabled
      ? theme.palette.secondary.dark
      : theme.palette.text.primary};
    text-decoration: none !important;
    font-weight: 500;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    opacity: ${disabled ? 0.5 : 1};

    &:hover {
      text-decoration: ${disabled ? "none" : "none"} !important;
    }
  `
);

//

const CreatorPageToolComponent = () => {
  // MODULE
  const [currentModuleMenuAnchorEl, setCurrentModuleMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const currentModuleMenuOpen = Boolean(currentModuleMenuAnchorEl);
  const handleModuleMenuButtonClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setCurrentModuleMenuAnchorEl(event.currentTarget);
  };
  const handleModuleMenuButtonClose = () => {
    setCurrentModuleMenuAnchorEl(null);
  };
  // ROWS
  const [rowMenuAnchorEl, setRowMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const rowMenuOpen = Boolean(rowMenuAnchorEl);
  const handleRowsMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setRowMenuAnchorEl(event.currentTarget);
  };
  const handleRowsMenuButtonClose = () => {
    setRowMenuAnchorEl(null);
  };

  // VIEW TYPE
  const [viewTypeMenuAnchorEl, setViewTypeMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const viewTypeMenuOpen = Boolean(viewTypeMenuAnchorEl);

  const handleViewTypeMenuButtonClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setViewTypeMenuAnchorEl(event.currentTarget);
  };
  const handleViewTypeMenuButtonClose = () => {
    setViewTypeMenuAnchorEl(null);
  };

  const { currentView } = useLayoutStore();
  const drawerIsOpen = useDrawer();

  const { open } = useModal("templateModal");

  const previewMode = usePreviewMode();

  const { row_count, module, view_type } = currentView || {
    row_count: 1,
    module: "",
    view_type: "",
  };

  const rowsOptionsMap = [1, 2, 3, 4];
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === view_type);
  const Icon = currentType?.icon;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          onClick={open}
        >
          Modèles de page
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          onClick={drawerIsOpen ? closeDrawer : openDrawer}
        >
          Widgets
        </Button>
      </Box>

      <Box>
        <Chip
          id="module-selector-button"
          clickable
          label={currentModule ? currentModule.label : "Modules"}
          size="small"
          aria-controls={currentModuleMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={currentModuleMenuOpen ? "true" : undefined}
          onClick={handleModuleMenuButtonClick}
          icon={<ViewModule />}
          sx={{
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "secondary",
            },
          }}
        />
        <Menu
          id="module-select-menu"
          anchorEl={currentModuleMenuAnchorEl}
          open={currentModuleMenuOpen}
          onClose={handleModuleMenuButtonClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          {modules &&
            modules.map((module, index) => (
              <MenuItem
                key={index}
                data-value={module.name}
                onClick={(e) => {
                  const value = e.currentTarget.dataset.value;
                  if (value) {
                    updateLayoutModule(value);
                  }
                  handleModuleMenuButtonClose();
                }}
              >
                {module.label}
              </MenuItem>
            ))}
        </Menu>
      </Box>
      <Box>
        <Chip
          icon={Icon ? <Icon /> : undefined}
          label={currentType?.label || "Type de vue"}
          clickable
          size="small"
          onClick={handleViewTypeMenuButtonClick}
          sx={{
            bgcolor: "transparent",
            "&:hover": { bgcolor: "secondary" },
          }}
        />
        <Menu
          id="view-type-select-menu"
          anchorEl={viewTypeMenuAnchorEl}
          open={viewTypeMenuOpen}
          onClose={handleViewTypeMenuButtonClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          {viewTypes &&
            viewTypes.map((viewType, index) => (
              <MenuItem
                key={index}
                data-value={viewType.id}
                onClick={(e) => {
                  const value = e.currentTarget.dataset.value;
                  if (value) {
                    updateLayoutViewType(value);
                  }
                  handleViewTypeMenuButtonClose();
                }}
              >
                {viewType.label}
              </MenuItem>
            ))}
        </Menu>
      </Box>
      <Box>
        <Chip
          id="row-selector-button"
          clickable
          label={row_count ? `${row_count} Lignes` : "Lignes"}
          size="small"
          aria-controls={rowMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={rowMenuOpen ? "true" : undefined}
          onClick={handleRowsMenuButtonClick}
          icon={<ViewStream />}
          sx={{
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "secondary",
            },
          }}
        />
        <Menu
          id="row-select-menu"
          anchorEl={rowMenuAnchorEl}
          open={rowMenuOpen}
          onClose={handleRowsMenuButtonClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          {rowsOptionsMap &&
            rowsOptionsMap.map((option, index) => (
              <MenuItem
                key={index}
                data-value={option}
                onClick={(e) => {
                  const value = e.currentTarget.dataset.value;
                  updateLayoutRows(Number(value));
                  handleRowsMenuButtonClose();
                }}
              >
                {option} Lignes
              </MenuItem>
            ))}
        </Menu>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box>
        <IconButton size="small">
          <Visibility />
        </IconButton>
      </Box>
      <Box>
        <IconButton size="small">
          <SaveOutlined />
        </IconButton>
      </Box>
    </Stack>
  );
};

export function Header({ drawerIsOpen }: { drawerIsOpen: boolean }) {
  const { mode } = useThemeMode();
  const matchRoute = useMatchRoute();
  const isLayoutCreator = matchRoute({ to: "/layout_creator" });

  const logoContainerStyle = 200;
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
      <Toolbar
        sx={{
          gap: 2,
          marginRight: drawerIsOpen ? DRAWER_WIDTH : 0,
          transition: "margin-right 0.3s",
        }}
      >
        <Stack sx={{ flexGrow: 1 }} display="flex">
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ width: logoContainerStyle }}>
              <StyledCustomLink
                to="/"
                variant="h6"
                color="text.primary"
                component="div"
              >
                NaoFix Widget POC
              </StyledCustomLink>
            </Box>
            <Stack>
              <Box display="flex" gap={1}>
                <StyledCustomLink disabled to="/notavailable">
                  Messagerie
                </StyledCustomLink>
                <StyledCustomLink disabled to="/notavailable">
                  Helpdesk
                </StyledCustomLink>
                <StyledCustomLink disabled to="/notavailable">
                  Intervention
                </StyledCustomLink>
                <StyledCustomLink disabled to="/notavailable">
                  Configuration
                </StyledCustomLink>
              </Box>
            </Stack>
          </Box>
        </Stack>
        {isLayoutCreator ? (
          <CreatorPageToolComponent />
        ) : (
          <StyledCustomLink to="/module_select">
            Création de page
          </StyledCustomLink>
        )}
        <IconButton onClick={toggleThemeMode}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
