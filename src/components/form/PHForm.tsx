import { FormProvider, useForm } from "react-hook-form";

const PHForm = ({ onSubmit, children }) => {
  const methods = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
