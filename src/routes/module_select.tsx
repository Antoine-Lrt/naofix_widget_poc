import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  darken,
  Grid,
  lighten,
  Typography,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { radiusMap } from "~/helpers/radiusMap";
import { modules } from "~/mock";
import { updateLayoutModule } from "~/store/layoutStore";
import { useThemeMode } from "~/store/themeStore";

export const Route = createFileRoute("/module_select")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleClick = ({ module }: any) => {
    updateLayoutModule(module);
    navigate({ to: "/layout_creator" });
  };

  const { borderRadius } = useThemeMode();
  return (
    <Box gap={4}>
      <Box textAlign="center" p={4}>
        <Typography variant="h4" fontWeight="bold">
          Sélectionnez un module
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choisissez le module pour lequel vous souhaitez créer un nouvelle vue
        </Typography>
      </Box>
      <Grid alignItems="center" justifyContent="center" container spacing={4}>
        {modules.map((module, index) => {
          return (
            <Grid size={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: radiusMap[borderRadius],
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    borderColor: module.color,
                  },
                }}
                onClick={() => handleClick({ module: module.name })}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {(() => {
                      const Icon = module.icon;
                      return (
                        <Box
                          sx={{
                            bgcolor: lighten(module.color, 0.9),
                            color: darken(module.color, 0.5),
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon fontSize="medium" />
                        </Box>
                      );
                    })()}
                    <Typography variant="h6">{module.label}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {module.description}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    color={module.color}
                    mt={4}
                    sx={{
                      cursor: "pointer",
                      "&:hover .arrow-icon": {
                        transform: "translateX(4px)",
                      },
                      ".arrow-icon": {
                        transition: "transform 0.2s",
                        display: "inline-flex",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="inherit"
                      fontWeight={600}
                    >
                      Créer une vue
                    </Typography>
                    <ArrowForward className="arrow-icon" fontSize="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
