import React from "react";

/* Store */
import { useModal } from "~/store/modalStore";

/* UI */
import DefaultModal from "../../DefaultModal";
import LayoutTemplatesModalTitle from "./LayoutTemplatesModalTitle";
import LayoutTemplatesModalContent from "./LayoutTemplatesModalContent";

export default function LayoutTemplatesModalCore({
  module,
}: {
  module: string;
}) {
  const { close: closeTemplateModal } = useModal("templateModal");
  return (
    <DefaultModal
      id="templateModal"
      size="lg"
      modalDetail={{
        title: <LayoutTemplatesModalTitle module={module} />,
        content: <LayoutTemplatesModalContent module={module} />,
        actions: [
          {
            label: "Fermer",
            onClick: closeTemplateModal,
          },
        ],
      }}
    />
  );
}
