import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Box,
} from "@mui/material";
import { get, isEmpty } from "lodash-es";
import React from "react";
import { widgetTypes, widgetsList } from "~/mock";
import { getWidgetComponent } from "~/utils/getWidgetsComponent";

const DrawerWidgetsList = () => {
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>(
    {}
  );

  const handleClick = (typeId: string) => {
    setOpenStates((prev) => ({ ...prev, [typeId]: !prev[typeId] }));
  };

  const groupedWidgets = widgetTypes.map((type) => ({
    ...type,
    widgets: widgetsList.filter(
      (w) => w.widget_type === type.id && !w.is_disabled
    ),
  }));

  return (
    <List component="nav" aria-labelledby="widget-types-list">
      {groupedWidgets.map((type) => {
        const isOpen = !!openStates[type.id];

        return (
          <div key={type.id}>
            <ListItemButton onClick={() => handleClick(type.id)}>
              <ListItemIcon>
                <type.icon />
              </ListItemIcon>
              <ListItemText primary={type.label} />
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {!isEmpty(type.widgets) ? (
                  type.widgets.map((widget) => {
                    const WidgetComponent = getWidgetComponent(
                      widget.id,
                      "desktop",
                      "md"
                    );
                    return (
                      <ListItem key={widget.id} sx={{ width: "100%", px: 2 }}>
                        {WidgetComponent ? (
                          <Box sx={{ width: "100%" }}>
                            <WidgetComponent id={widget.id} />
                          </Box>
                        ) : (
                          <ListItemText primary="Composant indisponible" />
                        )}
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListItemText primary="Aucun widget disponible" />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default DrawerWidgetsList;
