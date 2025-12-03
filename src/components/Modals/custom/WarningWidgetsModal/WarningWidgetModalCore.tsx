import React from "react";

/* Store */
import { useModal } from "~/store/modalStore";

/* UI */
import DefaultModal from "../../DefaultModal";
import WarningWidgetModalContent from "./WarningWidgetModalContent";

export default function WarningWidgetModalCore() {
  const {
    close: closeWidgetsModal,
    detail,
    onConfirm,
  } = useModal("warningWidgetsModal");

  const { widgets, targetWidth } = detail ?? {};
  return (
    <DefaultModal
      id="warningWidgetsModal"
      size="lg"
      modalDetail={{
        title: "Certaines widgets ne sont pas compatibles",
        content: <WarningWidgetModalContent widgets={widgets} />,
        actions: [
          {
            label: "Confirmer",
            onClick: () => {
              onConfirm?.();
              closeWidgetsModal();
            },
          },
          {
            label: "Fermer",
            onClick: closeWidgetsModal,
          },
        ],
      }}
    />
  );
}
