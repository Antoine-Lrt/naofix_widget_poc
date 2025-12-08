import { Store, useStore } from "@tanstack/react-store";

interface WidgetData {
  selectedId: string;
  filters: { [key: string]: any };
  pagination: { [key: string]: any };
}

interface Widgets {
  id: string;
  name?: string;
  type: string;
  position?: number;
  data?: WidgetData[];
  endpoint?: string | ((id: string) => string);
  selectedId?: string | null;
  linkedDetailId?: string;
  targetWidgetId?: string;
  filters?: { [key: string]: any };
  options?: { label: string; value: string }[];
}

export interface LayoutApiStore {
  view: {
    widgets: Widgets[];
  };
}

// Store
const initialStore: LayoutApiStore = {
  view: {
    widgets: [
      {
        id: "films-filters",
        type: "filter",
        targetWidgetId: "films-list",
        filters: [
          {
            filterType: "types",
            label: "Type",
            options: [
              { label: "Tous types", value: null },
              { label: "Films", value: "MOVIE" },
              { label: "Séries", value: "TV_SERIES" },
              { label: "Tv Movies", value: "TV_MOVIE" },
              { label: "Video Games", value: "VIDEO_GAME" },
            ],
          },
          {
            filterType: "genres",
            label: "Genre",
            options: [
              { label: "Tous genres", value: null },
              { label: "Action", value: "Action" },
              { label: "Animation", value: "Animation" },
              { label: "Drame", value: "Drama" },
              { label: "Fantastique", value: "Fantasy" },
              { label: "Horreur", value: "Horror" },
              { label: "Policier", value: "Mystery" },
              { label: "Romance", value: "Romance" },
              { label: "Science-Fiction", value: "Sci-Fi" },
              { label: "Thriller", value: "Thriller" },
            ],
          },
        ],
      },
      {
        id: "films-list",
        type: "list",
        endpoint: "/titles",
        selectedId: null,
        linkedDetailId: "film-detail",
        filters: {},
      },
      {
        id: "film-detail",
        type: "detail",
        endpoint: (id) => `/titles/${id}`,
      },
    ],
  },
};

export const apiStore = new Store<LayoutApiStore>(initialStore);

export function useWidgets() {
  return useStore(apiStore, (s) => s.view.widgets);
}

export function useWidget(id: string) {
  return useStore(apiStore, (s) => s.view.widgets.find((w) => w.id === id));
}
