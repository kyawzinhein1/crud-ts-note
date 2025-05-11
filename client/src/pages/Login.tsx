import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../schema/login";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "../slices/userApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/auth";

type FormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res));
    } catch (err: any) {
      console.log(err);
      
      console.error(err?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-3 mt-10">Login</h2>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="email" className="block text-sm mb-1 text-gray-500">
            Email
          </label>
          <input type="email" className="form" {...register("email")} />
          {errors.email && (
            <span className="text-sm text-red-600 font-medium">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-1 text-gray-500"
          >
            Password
          </label>
          <input type="password" className="form" {...register("password")} />
          {errors.password && (
            <span className="text-sm text-red-600 font-medium">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
