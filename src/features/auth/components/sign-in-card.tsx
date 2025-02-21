"use client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRegister } from "../api/use-sign-in";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { signUpSchema } from "../schemas";
import { RegisterData } from "../types";

export const SignInCard = () => {

  const {mutate, isPending} = useRegister();

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  }

  return (
    <Card className="w-full h-full md:w-[487px] shadow-none m-auto border-none lg:border rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center tracking-wider">
          SignUp
        </CardTitle>
        <CardDescription className="text-neutral-500 text-sm">
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className="text-blue-700">Privary Policy </span>
          </Link>
          and{" "}
          <Link href="/terms">
            <span className="text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="mx-7">
        <Separator />
      </div>
      <CardContent>
        <form className="*:py-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Name:</Label>
            <Input
              type="text"
              disabled={false}
              placeholder="Enter you Username"
              {...register("name")}
            />
             {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
        <Separator className="my-5" />
        <div className="*:mb-4">
          <Button
            onClick={() => {}}
            variant="secondary"
            disabled={false}
            size="lg"
            className="w-full"
          >
            <FcGoogle className="mr-2 size-5" />
            SignUp with Google
          </Button>

          <Button
            onClick={() => {}}
            variant="secondary"
            disabled={false}
            size="lg"
            className="w-full"
          >
            <FaFacebook className="mr-2 size-5" />
            SignUp with Facebook
          </Button>
        </div>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-4 flex items-center justify-center">
        <p>Already Have an Account?</p>
        <Link href="/sign-in">
          <span className="text-blue-700">&nbsp;Sign In</span>
        </Link>
      </CardContent>
    </Card>
  );
};
