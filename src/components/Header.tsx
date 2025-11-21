import { AppBar, Box, IconButton, Toolbar, css, styled } from "@mui/material";
import { CustomLink } from "./CustomLink";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { toggleThemeMode, useThemeMode } from "~/store/themeStore";

const StyledCustomLink = styled(CustomLink)(
  ({ theme }) => css`
    color: ${theme.palette.common.white};
  `
);

export function Header() {
  const { mode } = useThemeMode();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <StyledCustomLink to="/">NAOFIX WIDGET</StyledCustomLink>

          <IconButton color="inherit" onClick={toggleThemeMode}>
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
