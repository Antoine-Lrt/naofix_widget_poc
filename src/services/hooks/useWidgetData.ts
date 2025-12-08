import { useQuery } from "@tanstack/react-query";
import { fetchData } from "~/api";

export function useWidgetData(widget: {
  id: string;
  type: string;
  endpoint?: string;
  selectedId?: string | number;
  filters?: { [key: string]: any };
}) {
  return useQuery({
    queryKey: ["widget", widget.id, widget.selectedId, widget.filters],
    queryFn: () => fetchData({ widget }),
    enabled: widget.type === "list" || !!widget.selectedId,
  });
}
