import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../slices/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await registerMutation(data);
      reset();
      toast.success("Register successful.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-3 mt-10">Register</h2>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name" className="block text-sm mb-1 text-gray-500">
            Name
          </label>
          <input type="text" className="form" {...register("name")} />
          {errors.name && (
            <span className="text-sm text-red-600 font-medium">
              {errors.name.message}
            </span>
          )}
        </div>
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
          disabled={isSubmitting || isLoading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
