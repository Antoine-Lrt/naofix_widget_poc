import {
  AppBar,
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  css,
  styled,
} from "@mui/material";
import { CustomLink } from "./CustomLink";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { toggleThemeMode, useThemeMode } from "~/store/themeStore";

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

export function Header() {
  const { mode } = useThemeMode();

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
          <StyledCustomLink to="/module_select">
            Création de page
          </StyledCustomLink>
          <IconButton onClick={toggleThemeMode}>
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
