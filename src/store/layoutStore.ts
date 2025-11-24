import { Store, useStore } from "@tanstack/react-store";

export interface LayoutColumn {
  id: string;
  widgets: string[];
  width?: "xs" | "sm" | "md" | "lg" | undefined;
}

export interface LayoutRow {
  id: string;
  columns: LayoutColumn[];
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
  device: "desktop" | "tablet" | "mobile";
  rows?: LayoutRow[];
}

interface LayoutStoreState {
  currentView: ViewStateType | null;
  drawer: DrawerState;
}

const initialLayoutState: LayoutStoreState = {
  currentView: {
    id: "layout-1",
    name: "Default Layout",
    module: "module-1",
    model_name: "model-1",
    view_type: "list",
    row_count: 1,
    device: "desktop",
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
    rowHeights: [30, 30],
  },

  drawer: {
    isOpen: false,
  },
};

const layoutStore = new Store<LayoutStoreState>(initialLayoutState);

//
// ---------- GETTERS ----------
export const getcurrentView = () => layoutStore.state.currentView;

//
// ---------- ACTIONS ----------
//

export const loadLayout = (layout: ViewStateType) => {
  layoutStore.setState({ currentView: layout });
};

export const updateLayoutRows = (rows: number) => {
  const layout = getcurrentView();
  if (!layout) return;

  const newRowsData: LayoutRow[] = Array.from({ length: rows }, (_, i) => {
    if (i < (layout.rows?.length ?? 0)) {
      return layout.rows[i];
    }
    return {
      id: `row-${i}`,
      columns: [
        { id: `column-${i}-0`, width: "md", widgets: [] },
        { id: `column-${i}-1`, width: "md", widgets: [] },
        { id: `column-${i}-2`, width: "md", widgets: [] },
      ],
    };
  });

  layoutStore.setState({
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

  const row = layout.rows[rowIndex];
  if (!row) return;

  const newColumnData: LayoutColumn[] = Array.from(
    { length: columns },
    (_, i) => {
      if (i < row.columns.length) {
        return row.columns[i];
      }
      return { id: `column-${i}`, widgets: [] };
    }
  );

  const newRows = layout.rows.map((r, idx) =>
    idx === rowIndex ? { ...r, columns: newColumnData } : r
  );

  layoutStore.setState({
    currentView: {
      ...layout,
      rows: newRows,
    },
  });
};

export const updateColumnWidth = (
  rowIndex: number,
  columnIndex: number,
  width: string
) => {
  const layout = getcurrentView();
  if (!layout) return;
  const row = layout.rows[rowIndex];
  if (!row) return;

  const newColumnData: LayoutColumn[] = row.columns.map((c, idx) =>
    idx === columnIndex ? { ...c, width } : c
  );

  const newRows = layout.rows.map((r, idx) =>
    idx === rowIndex ? { ...r, columns: newColumnData } : r
  );

  layoutStore.setState({
    currentView: { ...layout, rows: newRows },
  });
};

//
// ---------- DRAWER ACTIONS ----------
//

export const openDrawer = () => {
  layoutStore.setState((state) => ({
    ...state,
    drawer: { isOpen: true },
  }));
};

export const closeDrawer = () => {
  layoutStore.setState((state) => ({
    ...state,
    drawer: { isOpen: false },
  }));
};

//
// ---------- HOOKS ----------
//

export const useLayoutStore = () => useStore(layoutStore);

export const usecurrentView = () =>
  useStore(layoutStore, (state) => state.currentView);

export const useDrawer = () => {
  const drawer = useStore(layoutStore, (state) => state.drawer);
  return drawer?.isOpen ?? false;
};
