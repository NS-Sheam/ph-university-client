import { Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  return (
    <>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            id={name}
          />
        )}
      />
    </>
  );
};

export default PHInput;
