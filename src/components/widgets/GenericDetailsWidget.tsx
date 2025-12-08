import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useWidget } from "~/store/layoutApiStore";
import { useWidgetData } from "~/services/hooks/useWidgetData";

interface Props {
  id: string;
}

export function GenericDetailsWidget({ id }: Props) {
  const widget = useWidget(id);
  const { data, isLoading, error } = useWidgetData(widget!);

  if (!widget) return null;
  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error loading data</Box>;
  if (!data) return <Box>No data available</Box>;

  return (
    <Paper sx={{ padding: 2, minHeight: "600px" }}>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Box flex={1} display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">
            {data.primaryTitle || data.name || "Untitled"}
          </Typography>
          {data.startYear && (
            <Box>
              <Typography variant="subtitle1">Date</Typography>
              <Typography variant="body2">{data.startYear}</Typography>
            </Box>
          )}
          {data.genres && (
            <Box>
              <Typography variant="subtitle2">Genre</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {data.genres.map((genre: string, index: number) => (
                  <Typography variant="body2" key={index} whiteSpace="nowrap">
                    {genre}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}
          {data.directors && (
            <Box>
              <Typography variant="subtitle2">Director(s)</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {data.directors.map((director: string, index: number) => (
                  <Typography variant="body2" key={index} whiteSpace="nowrap">
                    {director.displayName}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}
          {data.plot && (
            <Box>
              <Typography variant="subtitle1">Synopsis</Typography>
              <Typography variant="body2">{data.plot}</Typography>
            </Box>
          )}
        </Box>
        <Box flex={0.5} display="flex" justifyContent="end" gap={2}>
          <img
            src={data.primaryImage.url}
            alt={data.name}
            style={{ height: "300px", borderRadius: "4px" }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
