export const Text = ({
  classes,
  children,
}: {
  classes?: string;
  children: string;
}) => (
  <p
    className={`text-center text-xl text-form-secondary ${
      classes ? classes : ""
    }`}
  >
    {children}
  </p>
);
