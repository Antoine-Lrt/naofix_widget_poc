import axios from "axios";

const SWAPI_BASE_URL = "https://api.imdbapi.dev";

interface Widget {
  type: "list" | "detail";
  endpoint: string | ((id: string) => string);
  selectedId?: string | number | null;
  filters?: { [key: string]: any };
}

export const fetchData = async ({ widget }: { widget: Widget | null }) => {
  if (!widget) return null;

  const { type, endpoint, selectedId, filters } = widget;

  const queryString =
    filters && Object.keys(filters).length
      ? "?" +
        Object.entries(filters)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
      : "";

  if (type === "list" && endpoint) {
    const url = `${SWAPI_BASE_URL}${endpoint}${queryString}`;
    const { data } = await axios.get(url);

    const arrayKey = Object.keys(data).find((key) =>
      Array.isArray((data as any)[key])
    );

    return arrayKey ? data[arrayKey] : data;
  }

  if (type === "detail" && selectedId) {
    const url =
      typeof endpoint === "function"
        ? endpoint(selectedId.toString())
        : endpoint;
    const { data } = await axios.get(`${SWAPI_BASE_URL}${url}`);
    return data;
  }

  return null;
};
