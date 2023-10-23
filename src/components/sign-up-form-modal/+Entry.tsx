import { type ReactElement } from "react";

import { Modal } from "../styled-bases";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import Content from "./modal-content";

const SignUpFormModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => (
  <ComponentApiCx.Provider {...contextProps}>
    <Modal.WithVisibilityProvider
      button={button}
      panelContent={
        <div className="relative grid max-h-[70vh] w-[90vw] max-w-[1200px] place-items-center rounded-2xl border-4  border-orange bg-white p-xs text-left shadow-xl md:p-xl">
          <Content />
        </div>
      }
    />
  </ComponentApiCx.Provider>
);

export default SignUpFormModal;
