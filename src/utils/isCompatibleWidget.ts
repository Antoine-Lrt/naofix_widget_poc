import { flexMap } from "~/constant/layoutConstants";

export function isWidgetCompatible(
  widgetMinWidth: keyof typeof flexMap,
  newColumnWidth: keyof typeof flexMap
): boolean {
  return flexMap[newColumnWidth] >= flexMap[widgetMinWidth];
}
