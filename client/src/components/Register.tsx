import { Input } from "./ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterData } from "../types/auth.types";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const formSubmit = (data: RegisterData) => {
    console.log(data);
  };
  return (
    <>
      <div className="h-[100svh] items-center place-items-center content-center">
        <div className="container p-4 content-center text-left w-[600px] gap-4">
          <ul>
            <form onSubmit={handleSubmit(formSubmit)} className="">
              <Input<RegisterData>
                name="firstname"
                label="First name"
                register={register}
                errors={errors}
              />
              <Input<RegisterData>
                name="lastname"
                label="Last name"
                register={register}
                errors={errors}
              />
              <Input<RegisterData>
                name="username"
                label="Username"
                register={register}
                errors={errors}
              />
              <Input<RegisterData>
                name="email"
                label="Email"
                register={register}
                errors={errors}
                placeholder="example@example.com"
              />
              <Input<RegisterData>
                name="password"
                type="password"
                label="Password"
                register={register}
                errors={errors}
              />
              <Input<RegisterData>
                name="confirm_password"
                label="Confirm Password"
                type="password"
                register={register}
                errors={errors}
              />
              <div className="spacer my-4"></div>
              <button type="submit" className="btn-primary btn">
                Register
              </button>
            </form>
          </ul>
        </div>
      </div>
    </>
  );
}
