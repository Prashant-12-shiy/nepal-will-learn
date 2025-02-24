"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/features/auth/api/use-sign-in";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { logInSchema } from "../schemas";
import { LoginData } from "../types";
import { useGoogleLogin } from "../api/oauth-login";
import { useRouter } from "next/navigation";

export const SignInCard = () => {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/")
      }
    });
  };

  const loginWithGoogle = useGoogleLogin();

  return (
    <Card className="w-full h-full md:w-[487px] shadow-none m-auto border-none lg:border rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center tracking-wider">
          LogIn
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Welcome Back
        </CardDescription>
      </CardHeader>
      <div className="mx-7">
        <Separator />
      </div>
      <CardContent>
        <form className="*:py-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Email:</Label>
            <Input
              type="email"
              disabled={false}
              placeholder="Enter you Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label>Password:</Label>
            <Input
              type="password"
              disabled={false}
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="lg:w-full mt-4">
            {isPending ? "Loging..." : "Login"}
          </Button>
        </form>
        <p className="underline text-end text-blue-400 text-xs my-3">
            <Link href="/forgot-password"> forget password?</Link>
        </p>
        <Separator className="my-5" />
        <div className="*:mb-4">
          <Button
            onClick={loginWithGoogle}
            variant="secondary"
            disabled={false}
            size="lg"
            className="w-full"
          >
            <FcGoogle className="mr-2 size-5" />
            Login with Google
          </Button>

          <Button
            onClick={() => {}}
            variant="secondary"
            disabled={false}
            size="lg"
            className="w-full"
          >
            <FaFacebook className="mr-2 size-5" />
            Login with Facebook
          </Button>
        </div>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-4 flex items-center justify-center">
        <p>Don&apos;t Have an Account?</p>
        <Link href="/sign-up">
          <span className="text-blue-700">&nbsp;Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
};
