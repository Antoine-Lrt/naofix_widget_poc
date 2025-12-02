import React from "react";

/* Store */
import { useModal } from "~/store/modalStore";

/* UI */
import DefaultModal from "../../DefaultModal";
import WidgetModalContent from "./WidgetModalContent";

export default function WidgetModalCore() {
  const { close: closeWidgetsModal } = useModal("widgetsModal");
  return (
    <DefaultModal
      id="widgetsModal"
      size="lg"
      modalDetail={{
        title: "Liste des widgets",
        content: <WidgetModalContent />,
        actions: [
          {
            label: "Fermer",
            onClick: closeWidgetsModal,
          },
        ],
      }}
    />
  );
}
