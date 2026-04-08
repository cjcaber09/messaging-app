import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginData,
  type UserData,
} from "../types/auth.types";
import { authApi } from "../api/auth.api";
import { UseAuth } from "../context/authProvider";
export default function Login() {
const { setAuth } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginData) => {
    const isAuthenticated = await authApi.login(data);
    if (!isAuthenticated) console.log(isAuthenticated);
    const result: { user: UserData } = isAuthenticated.data;
    setAuth(result.user);
  };
  return (
    <>
      <div className="h-[100svh] items-center place-items-center content-center">
        <div className="container text-left px-6 py-6 max-w-[500px]">
          <div className="brand pb-4">
            <div className="">Login</div>
          </div>
          <div className="">
            <h2>Welcome back!</h2>
            <span className="text-xs font-regular">
              Sign in to continue your conversation
            </span>
          </div>
          <div className="form mt-6">
            <form
              action="post"
              className=" flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="text"
                {...register("email", { required: true, maxLength: 20 })}
                placeholder="example@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-900">{errors.email.message}</p>
              )}
              <div className="text-sm text-gray-300">Password</div>
              <input
                type="password"
                {...register("password")}
                placeholder="**********"
              />
              {errors.password && (
                <p className="text-xs text-red-900">
                  {errors.password.message}
                </p>
              )}
              <div className="spacer my-8"></div>
              <div className="w-full text-center">
                <button
                  className="btn-primary btn w-full justify-center"
                  type="submit"
                >
                  Login
                </button>
                <div className="text-xs mt-2 ">
                  Dont have an account yet?{" "}
                  <a href="/register" className="underline text-sky-300">
                    Register Now
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
