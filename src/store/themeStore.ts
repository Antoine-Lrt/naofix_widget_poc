import { Store, useStore } from "@tanstack/react-store";

interface ThemeStoreState {
  mode: "light" | "dark";
}

const themeStore = new Store<ThemeStoreState>({
  mode: "light",
});

export const toggleThemeMode = () => {
  const current = themeStore.state.mode;
  themeStore.setState({ mode: current === "light" ? "dark" : "light" });
};

export const useThemeMode = () => useStore(themeStore);
