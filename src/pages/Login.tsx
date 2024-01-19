import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login, { data, isError, isLoading, isSuccess }] = useLoginMutation();
  console.log(data);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          {...register("id")}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
