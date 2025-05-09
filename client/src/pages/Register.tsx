import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";

type FormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const submit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
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
          {errors.name && <span className="text-sm text-red-600 font-medium">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-1 text-gray-500">
            Email
          </label>
          <input type="email" className="form" {...register("email")} />
          {errors.email && <span className="text-sm text-red-600 font-medium">{errors.email.message}</span>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-1 text-gray-500"
          >
            Password
          </label>
          <input type="password" className="form" {...register("password")} />
          {errors.password && <span className="text-sm text-red-600 font-medium">{errors.password.message}</span>}
        </div>
        <button
          type="submit"
          className="text-white bg-black py-2 px-4 rounded-sm cursor-pointer"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
