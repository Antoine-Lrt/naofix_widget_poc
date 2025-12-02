import { ListWidgetComponents } from "~/components/widgets/List";

type DeviceType = "desktop" | "tablet" | "mobile";
type ColumnWidth = "xs" | "sm" | "md" | "lg";

export const getWidgetComponent = (
  widgetId: string,
  device: DeviceType,
  columnWidth?: ColumnWidth
) => {
  console.log(
    "🚀 ~ getWidgetsComponent.ts:11 ~ getWidgetComponent ~ columnWidth:",
    columnWidth
  );

  console.log(
    "🚀 ~ getWidgetsComponent.ts:11 ~ getWidgetComponent ~ device:",
    device
  );

  console.log(
    "🚀 ~ getWidgetsComponent.ts:11 ~ getWidgetComponent ~ widgetId:",
    widgetId
  );

  switch (widgetId) {
    case "list.md":
      if (device === "desktop" && columnWidth) {
        return ListWidgetComponents.desktop[columnWidth];
      } else if (device === "tablet") {
        return ListWidgetComponents.tablet.default;
      } else if (device === "mobile") {
        return ListWidgetComponents.mobile.default;
      }
      break;

    default:
      return null;
  }
};
