import { getcurrentView } from "~/store/layoutStore";

export type WidthValue = "xs" | "sm" | "md" | "lg";

export interface WidthOption {
  label: string;
  value: WidthValue;
}

export type WidthOptionsMap = Record<WidthValue, WidthOption>;

export const getColumnsWidthOptionsMap = (
  rowIndex: number
): WidthOptionsMap | {} => {
  const layout = getcurrentView();
  if (!layout) return {};

  const row = layout.rows?.[rowIndex];
  if (!row) return {};

  const columnsNumber = row.columns?.length ?? 0;

  switch (columnsNumber) {
    case 1:
      return {};

    case 2:
      return {
        sm: { label: "Petite", value: "sm" },
        md: { label: "Moyenne", value: "md" },
        lg: { label: "Large", value: "lg" },
      };

    default:
      return {
        xs: { label: "Étroite", value: "xs" },
        sm: { label: "Petite", value: "sm" },
        md: { label: "Moyenne", value: "md" },
        lg: { label: "Large", value: "lg" },
      };
  }
};
