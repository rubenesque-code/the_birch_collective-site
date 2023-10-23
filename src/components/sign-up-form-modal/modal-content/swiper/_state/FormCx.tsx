import React, { createContext, type ReactNode } from "react";

type ContextValue = {
  errorMessageVisibility: {
    value: "hide" | "show";
    update: (value: "hide" | "show") => void;
  };
  submitFormStatus: {
    value: "idle" | "loading" | "success";
    update: (value: "idle" | "loading" | "success") => void;
  };
};

const Context = createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
}) => {
  const [submitFormStatus, setSubmitFormStatus] = React.useState<
    "idle" | "loading" | "success"
  >("idle");
  const [showErrorMessage, setShowErrorMessage] = React.useState<
    "hide" | "show"
  >("hide");

  const value: ContextValue = {
    errorMessageVisibility: {
      value: showErrorMessage,
      update: setShowErrorMessage,
    },
    submitFormStatus: {
      value: submitFormStatus,
      update: setSubmitFormStatus,
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("FormCx.use must be used within its provider!");
  }

  return context;
};

function FormCx() {
  throw new Error(
    "FormCx exists for naming purposes only and should not be used as a component",
  );
}

export { FormCx };

FormCx.Provider = Provider;
FormCx.use = useContext;
