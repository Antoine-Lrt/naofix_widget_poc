import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { isEmpty } from "lodash-es";
import React from "react";

export default function WarningWidgetModalContent({
  widgets,
}: {
  widgets: Array<{ id: string }>;
}) {
  if (isEmpty(widgets)) {
    return;
  }

  return (
    <Stack>
      <List subheader="Les widgets suivants ne sont pas compatibles car ils ne peuvent pas s'adapter à la largeur cible :">
        {widgets.map((widget) => {
          return (
            <ListItem key={widget.id}>
              <ListItemText primary={widget.id} />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
