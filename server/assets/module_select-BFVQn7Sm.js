import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { c as createSvgIcon, u as useThemeMode, B as Box, T as Typography, G as Grid, m as modules, C as Card, r as radiusMap, a as CardContent, d as darken, l as lighten, b as updateLayoutModule } from "./router-BBsnP-9i.js";
import "@tanstack/react-router-devtools";
import "@emotion/react";
import "@emotion/cache";
import "react";
import "react-is";
import "prop-types";
import "clsx";
import "@emotion/styled";
import "@emotion/serialize";
import "@tanstack/react-store";
import "react-transition-group";
import "react-dom";
import "@dnd-kit/core";
import "zod";
const ArrowForward = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
}), "ArrowForward");
function RouteComponent() {
  const navigate = useNavigate();
  const handleClick = ({
    module
  }) => {
    updateLayoutModule(module);
    navigate({
      to: "/layout_creator"
    });
  };
  const {
    borderRadius
  } = useThemeMode();
  return /* @__PURE__ */ jsxs(Box, { gap: 4, children: [
    /* @__PURE__ */ jsxs(Box, { textAlign: "center", p: 4, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", fontWeight: "bold", children: "Sélectionnez un module" }),
      /* @__PURE__ */ jsx(Typography, { variant: "body1", color: "text.secondary", children: "Choisissez le module pour lequel vous souhaitez créer un nouvelle vue" })
    ] }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 4, children: modules.map((module, index) => {
      return /* @__PURE__ */ jsx(Grid, { size: 3, children: /* @__PURE__ */ jsx(Card, { elevation: 0, sx: {
        height: "100%",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: radiusMap[borderRadius],
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          borderColor: module.color
        }
      }, onClick: () => handleClick({
        module: module.name
      }), children: /* @__PURE__ */ jsxs(CardContent, { sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", gap: 2, mb: 2, children: [
          (() => {
            const Icon = module.icon;
            return /* @__PURE__ */ jsx(Box, { sx: {
              bgcolor: lighten(module.color, 0.9),
              color: darken(module.color, 0.5),
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsx(Icon, { fontSize: "medium" }) });
          })(),
          /* @__PURE__ */ jsx(Typography, { variant: "h6", children: module.label })
        ] }),
        /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: module.description }) }),
        /* @__PURE__ */ jsxs(Box, { display: "flex", flexDirection: "row", justifyContent: "space-between", color: module.color, mt: 4, sx: {
          cursor: "pointer",
          "&:hover .arrow-icon": {
            transform: "translateX(4px)"
          },
          ".arrow-icon": {
            transition: "transform 0.2s",
            display: "inline-flex"
          }
        }, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "inherit", fontWeight: 600, children: "Créer une vue" }),
          /* @__PURE__ */ jsx(ArrowForward, { className: "arrow-icon", fontSize: "small" })
        ] })
      ] }) }) }, index);
    }) })
  ] });
}
export {
  RouteComponent as component
};
