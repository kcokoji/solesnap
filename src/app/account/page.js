import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default function page() {
  const { isAuthenticated } = getKindeServerSession();

  if (isAuthenticated()) {
    // Redirect to the dashboard if the user is authenticated
    redirect("/dashboard");
  }
  return (
    <div className="mx-auto flex justify-center items-center flex-col h-full w-full py-10">
      <h1 className="text-3xl font-bold">Hey There!</h1>
      <p className="leading-9 text-gray-600">
        Would you like to create an account?
      </p>
      <div className="text-white bg-black p-4 my-4">
        <RegisterLink>Register</RegisterLink>
      </div>
      <p>Or</p>
      <p className="leading-9 text-gray-600">Already have an account?</p>
      <div className="text-white bg-black p-4 my-4">
        <LoginLink>Login</LoginLink>
      </div>
    </div>
  );
}
