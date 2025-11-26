import { Store, useStore } from "@tanstack/react-store";

interface ThemeStoreState {
  mode: "light" | "dark";
  borderRadius: "none" | "small" | "medium" | "large" | "rounded";
}

const themeStore = new Store<ThemeStoreState>({
  mode: "light",
  borderRadius: "medium",
});

export const toggleThemeMode = () => {
  const current = themeStore.state.mode;
  themeStore.setState({ mode: current === "light" ? "dark" : "light" });
};

export const changeThemeBorderRadius = (
  borderRadius: "none" | "small" | "medium" | "large" | "rounded"
) => {
  themeStore.setState({ borderRadius });
};

export const useThemeMode = () => useStore(themeStore);
