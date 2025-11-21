import {
  AppBar,
  Box,
  Breadcrumbs,
  Chip,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  TableRow,
  Toolbar,
  Typography,
  css,
  styled,
} from "@mui/material";
import { CustomLink } from "./CustomLink";
import { Brightness4, Brightness7, TableRows } from "@mui/icons-material";
import { toggleThemeMode, useThemeMode } from "~/store/themeStore";
import React from "react";
import {
  updateColumnWidth,
  updateLayoutRows,
  useLayoutStore,
} from "~/store/layoutStore";

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

const breadcrumbs = [
  <StyledCustomLink underline="hover" key="1" color="" href="/">
    MUI
  </StyledCustomLink>,
  <StyledCustomLink
    underline="hover"
    key="2"
    color="text.primary"
    href="/material-ui/getting-started/installation/"
    // onClick={handleClick}
  >
    Core
  </StyledCustomLink>,
  <Typography key="3" sx={{ color: "white" }}>
    Breadcrumb
  </Typography>,
];

const isLayoutCreator = true;

const CreatorPageToolComponent = () => {
  const [currentViewType, setCurrentViewType] = React.useState<string>("list");
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const columnMenuOpen = Boolean(columnMenuAnchorEl);
  const handleViewTypeButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };
  const handleViewTypeButtonClose = () => {
    setColumnMenuAnchorEl(null);
  };
  const [rowMenuAnchorEl, setRowMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const rowMenuOpen = Boolean(rowMenuAnchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setRowMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setRowMenuAnchorEl(null);
  };

  const { currentView } = useLayoutStore();
  console.log(
    "🚀 ~ Header.tsx:71 ~ CreatorPageToolComponent ~ currentView:",
    currentView
  );

  const { rows_count } = currentView;

  const rowsOptionsMap = [1, 2, 3, 4];

  return (
    <Stack direction="row" spacing={1}>
      <Box>
        <Chip
          id="row-selector-button"
          clickable
          label={rows_count ? `${rows_count} Lignes` : "Lignes"}
          size="small"
          aria-controls={rowMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={rowMenuOpen ? "true" : undefined}
          onClick={handleClick}
          icon={<TableRows />}
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
          onClose={handleClose}
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
                  handleClose();
                }}
              >
                {option} Lignes
              </MenuItem>
            ))}
        </Menu>
      </Box>
      <Box>
        <Chip
          id="viewType-selector-button"
          clickable
          label={currentViewType === "list" ? "Liste" : "Détails"}
          size="small"
          aria-controls={columnMenuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={columnMenuOpen ? "true" : undefined}
          onClick={handleViewTypeButtonClick}
          icon={<TableRow />}
        />
        <Menu
          id="row-select-menu"
          anchorEl={columnMenuAnchorEl}
          open={columnMenuOpen}
          onClose={handleViewTypeButtonClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem>Liste</MenuItem>
          <MenuItem>Détails</MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
};

export function Header() {
  const { mode } = useThemeMode();
  // const matchRoute = useMatchRoute();
  // const isLayoutCreator = matchRoute({ to: "/layout_creator" });
  // console.log("🚀 ~ Header.tsx:63 ~ Header ~ result:", isLayoutCreator);

  const logoContanierStyle = 200;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
        <Toolbar sx={{ gap: 2 }}>
          <Stack sx={{ flexGrow: 1 }} display="flex">
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ width: logoContanierStyle }}>
                <Typography variant="h6" color="text.primary" component="div">
                  NaoFix Widget POC
                </Typography>
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
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
