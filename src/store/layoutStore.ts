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

// export interface LayoutCell {
//   id: string;
//   row: LayoutRow[];
//   rowIndex: number;
//   columnIndex: number;
//   widgets: string[];
// }

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
}

// const createEmptyGrid = (rows: number, columns: number): LayoutCell[][] => {
//   return Array.from({ length: rows }, (_, rowIndex) =>
//     Array.from({ length: columns }, (_, columnIndex) => ({
//       id: `cell-${rowIndex}-${columnIndex}`,
//       rowIndex,
//       columnIndex,
//       widgets: [],
//     }))
//   );
// };

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
};

const layoutStore = new Store<LayoutStoreState>(initialLayoutState);

//
// ---------- GETTERS ----------
//
export const getcurrentView = () => layoutStore.state.currentView;

//
// ---------- ACTIONS ----------
//

export const loadLayout = (layout: PageLayoutState) => {
  layoutStore.setState({ currentView: layout });
};

export const updateLayoutRows = (rows: number) => {
  const layout = getcurrentView();
  if (!layout) return;

  const newRowsData: LayoutRow[] = Array.from({ length: rows }, (_, i) => {
    if (i < layout.rows.length) {
      return layout.rows[i];
    }
    return {
      id: `row-${i}`,
      columns: [
        { id: "column-0", width: undefined, widgets: [] },
        { id: "column-1", width: undefined, widgets: [] },
        { id: "column-2", width: undefined, widgets: [] },
      ],
    };
  });

  // const height = 50 / rows;
  // const newHeights = Array(rows).fill(height);

  layoutStore.setState({
    currentView: {
      ...layout,
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
  const column = row.columns[columnIndex];
  if (!column) return;
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
// ---------- HOOKS (selectors) ----------
//

export const useLayoutStore = () => useStore(layoutStore);

export const usecurrentView = () =>
  useStore(layoutStore, (state) => state.currentView);
