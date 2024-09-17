import client from "api/client";
import SignInForm, { type SignInSchema } from "components/forms/SignIn";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (data: SignInSchema) => {
      try {
        await client.authenticate(data);
        console.log("/admin");
        navigate("/admin");
      } catch (e) {
        console.log("errrr", e);
      }
    },
    [navigate],
  );
  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:ps-4 lg:ps-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          ورود
        </h4>
        <p className="mb-9 ms-1 text-base text-gray-600">
          برای ورود به پنل کاربری رمز عبور خود را وارد کنید!
        </p>
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* email */}
        <SignInForm onSubmit={onSubmit} />
        {/* <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ms-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </div>
    </div>
  );
}
