import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as createSvgIcon, P as Paper, u as useThemeMode, S as Stack, B as Box, T as Typography, r as radiusMap, e as Chip, M as Menu, f as MenuItem, g as updateColumnWidth, h as useLayoutStore, m as modules, v as viewTypes, G as Grid, i as updateLayoutColumns } from "./router-BBsnP-9i.js";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import React__default from "react";
import { isEmpty } from "lodash-es";
import "@tanstack/react-router";
import "@tanstack/react-router-devtools";
import "@emotion/react";
import "@emotion/cache";
import "react-is";
import "prop-types";
import "clsx";
import "@emotion/styled";
import "@emotion/serialize";
import "@tanstack/react-store";
import "react-transition-group";
import "react-dom";
import "zod";
const Height = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M13 6.99h3L12 3 8 6.99h3v10.02H8L12 21l4-3.99h-3z"
}), "Height");
const ViewWeek = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M5.33 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1.33c1.1 0 2 .9 2 2v12c0 1.1-.89 2-2 2M22 18V6c0-1.1-.9-2-2-2h-1.33c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2H20c1.11 0 2-.9 2-2m-7.33 0V6c0-1.1-.9-2-2-2h-1.33c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h1.33c1.1 0 2-.9 2-2"
}), "ViewWeek");
const Widgets = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M13 13v8h8v-8zM3 21h8v-8H3zM3 3v8h8V3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66z"
}), "Widgets");
function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : void 0;
  return /* @__PURE__ */ jsx(
    Paper,
    {
      ref: setNodeRef,
      sx: { ...style, p: 2.5, borderRadius: 2 },
      ...listeners,
      ...attributes,
      children
    }
  );
}
const AddWidgetInfo = () => {
  const { borderRadius } = useThemeMode();
  return /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 1, alignItems: "center", children: [
    /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          bgcolor: "background.paper",
          width: 58,
          height: 58,
          borderRadius: radiusMap[borderRadius],
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ jsx(Widgets, {})
      }
    ),
    /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "secondary", textAlign: "center", children: [
      "Cliquez sur le bouton ",
      /* @__PURE__ */ jsx("strong", { children: "Widget" }),
      " et faites-le glisser votre widget ici."
    ] })
  ] });
};
function Droppable({
  column,
  columnIndex,
  rowIndex,
  children,
  widthConfigButton
}) {
  const [anchorEl, setAnchorEl] = React__default.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { borderRadius } = useThemeMode();
  const widthOptionsMap = {
    xs: { label: "Étroite", value: "xs" },
    sm: { label: "Petite", value: "sm" },
    md: { label: "Moyenne", value: "md" },
    lg: { label: "Large", value: "lg" }
  };
  const { isOver, setNodeRef } = useDroppable({
    id: column.id
  });
  return /* @__PURE__ */ jsxs(Stack, { spacing: 1, children: [
    /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(
      Typography,
      {
        variant: "caption",
        margin: 0,
        color: "secondary",
        lineHeight: 0,
        children: [
          column.widgets.length,
          " widgets"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      Box,
      {
        ref: setNodeRef,
        sx: {
          minHeight: 400,
          p: 2.5,
          borderRadius: radiusMap[borderRadius],
          bgcolor: isOver ? "primary.50" : "transparent",
          border: "2px dashed",
          borderColor: isOver ? "primary.main" : "divider",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        },
        children: React__default.Children.count(children) === 0 ? /* @__PURE__ */ jsx(AddWidgetInfo, {}) : children
      }
    ),
    widthConfigButton && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Box, { display: "flex", justifyContent: "center", children: /* @__PURE__ */ jsx(
        Chip,
        {
          id: "width-button",
          clickable: true,
          label: column.width && widthOptionsMap[column.width] ? widthOptionsMap[column.width].label : "Width",
          size: "small",
          "aria-controls": open ? "basic-menu" : void 0,
          "aria-haspopup": "true",
          "aria-expanded": open ? "true" : void 0,
          onClick: handleClick,
          icon: /* @__PURE__ */ jsx(Height, { sx: { rotate: "90deg" } })
        }
      ) }),
      /* @__PURE__ */ jsx(
        Menu,
        {
          id: "basic-menu",
          anchorEl,
          open,
          onClose: handleClose,
          slotProps: {
            list: {
              "aria-labelledby": "basic-button"
            }
          },
          children: Object.values(widthOptionsMap).map((option) => /* @__PURE__ */ jsx(
            MenuItem,
            {
              onClick: () => {
                updateColumnWidth(
                  rowIndex,
                  columnIndex,
                  option.value
                );
                handleClose();
              },
              children: option.label
            },
            option.value
          ))
        }
      )
    ] })
  ] });
}
function RouteComponent() {
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = React__default.useState(null);
  const columnMenuOpen = Boolean(columnMenuAnchorEl);
  const handleColumnMenuButtonClick = (event) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };
  const handleColumnMenuButtonClose = () => {
    setColumnMenuAnchorEl(null);
  };
  const {
    currentView
  } = useLayoutStore();
  if (!currentView) return /* @__PURE__ */ jsx("div", { children: "Chargement du layout…" });
  const {
    rows,
    module,
    view_type
  } = currentView;
  const flexMap = {
    xs: 4,
    sm: 5,
    md: 7,
    lg: 8
  };
  const columnsOptionsMap = [1, 2, 3, 4];
  const currentModule = modules.find((m) => m.name === module);
  const currentType = viewTypes.find((t) => t.id === view_type);
  function getFlexValue(width) {
    return flexMap[width] || 1;
  }
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsxs(Grid, { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h3", fontWeight: "bolder", children: currentModule ? currentModule.label.toLocaleUpperCase() : "Module" }),
      currentType && /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", textTransform: "uppercase", lineHeight: 0.5, children: [
        "NOUVELLE VUE DE ",
        currentType?.label
      ] })
    ] }),
    rows && !isEmpty(rows) ? rows.map((row, rowIndex) => {
      const columnsCount = row.columns.length;
      return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 1, size: 12, children: [
        /* @__PURE__ */ jsx(Grid, { size: 12, children: /* @__PURE__ */ jsxs(Box, { textAlign: "center", children: [
          /* @__PURE__ */ jsx(Chip, { id: "row-selector-button", clickable: true, label: row.columns.length ? `${row.columns.length} Colonnes` : "Colonnes", size: "small", "aria-controls": columnMenuOpen ? "basic-menu" : void 0, "aria-haspopup": "true", "aria-expanded": columnMenuOpen ? "true" : void 0, onClick: handleColumnMenuButtonClick, icon: /* @__PURE__ */ jsx(ViewWeek, {}), sx: {
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "secondary"
            }
          } }),
          /* @__PURE__ */ jsx(Menu, { id: "row-select-menu", anchorEl: columnMenuAnchorEl, open: columnMenuOpen, onClose: handleColumnMenuButtonClose, slotProps: {
            list: {
              "aria-labelledby": "basic-button"
            }
          }, children: columnsOptionsMap && columnsOptionsMap.map((option, index) => /* @__PURE__ */ jsxs(MenuItem, { "data-value": option, onClick: (e) => {
            e.currentTarget.dataset.value;
            updateLayoutColumns(rowIndex, Number(e.currentTarget.dataset.value));
            handleColumnMenuButtonClose();
          }, children: [
            option,
            " Colonnes"
          ] }, index)) })
        ] }) }),
        /* @__PURE__ */ jsx(Grid, { container: true, size: 12, flexWrap: "nowrap", children: row.columns.map((column, columnIndex) => {
          return /* @__PURE__ */ jsx(Grid, { style: {
            flex: getFlexValue(column.width ?? "xs"),
            minWidth: 0
          }, children: /* @__PURE__ */ jsx(Droppable, { column, columnIndex, rowIndex, widthConfigButton: columnsCount > 1, children: column.widgets.map((widget) => /* @__PURE__ */ jsx(Draggable, { id: widget, children: widget }, widget)) }) }, column.id);
        }) })
      ] }, rowIndex);
    }) : null
  ] });
}
export {
  RouteComponent as component
};
