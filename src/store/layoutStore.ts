import { Store, useStore } from "@tanstack/react-store";

export interface LayoutColumn {
  id: string;
  widgets: string[];
  width?: "xs" | "sm" | "md" | "lg";
  order?: number;
}

export interface LayoutRow {
  id: string;
  columns: LayoutColumn[];
  order?: number;
}

interface DrawerState {
  isOpen: boolean;
}

export interface ViewStateType {
  id: string;
  name: string;
  module: string;
  model_name: string;
  view_type: string;
  row_count: number;
  device: "computer" | "tablet" | "mobile";
  rows?: LayoutRow[];
}

interface LayoutStoreState {
  currentView: ViewStateType | null;
  drawer: DrawerState;
  previewMode: boolean;
}

const initialLayoutState: LayoutStoreState = {
  currentView: {
    id: "layout-1",
    name: "Default Layout",
    module: "",
    model_name: "",
    view_type: "list",
    row_count: 1,
    device: "computer",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "xs", widgets: [] },
          { id: "column-0-1", order: 1, width: "md", widgets: [] },
          { id: "column-0-2", order: 2, width: "md", widgets: [] },
          { id: "column-0-3", order: 3, width: "md", widgets: [] },
        ],
      },
    ],
  },
  drawer: {
    isOpen: false,
  },
  previewMode: false,
};

const layoutStore = new Store<LayoutStoreState>(initialLayoutState);

//
// ---------- GETTERS ----------
export const getcurrentView = () => layoutStore.state.currentView;

//
// ---------- ACTIONS ----------
export const loadLayout = (layout: ViewStateType) => {
  layoutStore.setState({
    ...layoutStore.state,
    currentView: layout,
  });
};

export const applyLayoutTemplate = (template: ViewStateType) => {
  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...template, id: template.id },
  });
};

export const updateLayoutDevice = (
  device: "computer" | "tablet" | "mobile"
) => {
  const layout = getcurrentView();
  if (!layout) return;

  let defaultColumnsCount;
  switch (device) {
    case "computer":
      defaultColumnsCount = 4;
      break;
    case "tablet":
      defaultColumnsCount = 3;
      break;
    case "mobile":
      defaultColumnsCount = 1;
      break;
    default:
      defaultColumnsCount = 4;
  }

  const updatedRows = layout.rows?.map((row, rowIndex) => {
    const newColumns: LayoutColumn[] = Array.from(
      { length: defaultColumnsCount },
      (_, i) => {
        if (i < row.columns.length) return row.columns[i];
        return {
          id: `column-${rowIndex}-${i}`,
          order: i,
          width: "md",
          widgets: [],
        };
      }
    );
    return { ...row, columns: newColumns };
  });

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, device, rows: updatedRows },
  });
};

export const updateLayoutRows = (rows: number) => {
  const layout = getcurrentView();
  if (!layout) return;

  const newRowsData: LayoutRow[] = Array.from({ length: rows }, (_, i) => {
    if (i < (layout.rows?.length ?? 0)) return layout.rows![i];

    return {
      id: `row-${i}`,
      order: i,
      columns: [
        { id: `column-${i}-0`, order: 0, width: "md", widgets: [] },
        { id: `column-${i}-1`, order: 1, width: "md", widgets: [] },
        { id: `column-${i}-2`, order: 2, width: "md", widgets: [] },
      ],
    };
  });

  layoutStore.setState({
    ...layoutStore.state,
    currentView: {
      ...layout,
      row_count: rows,
      rows: newRowsData,
    },
  });
};

export const updateLayoutColumns = (rowIndex: number, columns: number) => {
  const layout = getcurrentView();
  if (!layout) return;

  const row = layout.rows![rowIndex];
  if (!row) return;

  const newColumnData: LayoutColumn[] = Array.from(
    { length: columns },
    (_, i) => {
      if (i < row.columns.length) return row.columns[i];
      return {
        id: `column-${rowIndex}-${i}`,
        order: i,
        width: "md",
        widgets: [],
      };
    }
  );

  const newRows = layout.rows!.map((r, idx) =>
    idx === rowIndex ? { ...r, columns: newColumnData } : r
  );

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, rows: newRows },
  });
};

export const updateColumnWidth = (
  rowIndex: number,
  columnIndex: number,
  width: "xs" | "sm" | "md" | "lg"
) => {
  const layout = getcurrentView();
  if (!layout) return;

  const row = layout.rows![rowIndex];
  if (!row) return;

  const newColumnData = row.columns.map((c, idx) =>
    idx === columnIndex ? { ...c, width } : c
  );

  const newRows = layout.rows!.map((r, idx) =>
    idx === rowIndex ? { ...r, columns: newColumnData } : r
  );

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, rows: newRows },
  });
};

export const updateLayoutModule = (module: string) => {
  const layout = getcurrentView();
  if (!layout) return;

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, module },
  });
};

export const updateLayoutViewType = (view_type: string) => {
  const layout = getcurrentView();
  if (!layout) return;

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, view_type },
  });
};

export const updateLayoutModelName = (model_name: string) => {
  const layout = getcurrentView();
  if (!layout) return;

  layoutStore.setState({
    ...layoutStore.state,
    currentView: { ...layout, model_name },
  });
};

//
// ---------- DRAWER ACTIONS ----------
export const openDrawer = () => {
  layoutStore.setState({
    ...layoutStore.state,
    drawer: { isOpen: true },
  });
};

export const closeDrawer = () => {
  layoutStore.setState({
    ...layoutStore.state,
    drawer: { isOpen: false },
  });
};

//
// ---------- PREVIEW MODE ----------
export const togglePreviewMode = () => {
  layoutStore.setState({
    ...layoutStore.state,
    previewMode: !layoutStore.state.previewMode,
  });
};

//
// ---------- HOOKS ----------
export const useLayoutStore = () => useStore(layoutStore);

export const usecurrentView = () =>
  useStore(layoutStore, (state) => state.currentView);

export const useDrawer = () =>
  useStore(layoutStore, (state) => state.drawer.isOpen);

export const usePreviewMode = () =>
  useStore(layoutStore, (state) => state.previewMode);

export const useDevice = () =>
  useStore(layoutStore, (state) => state.currentView?.device);
