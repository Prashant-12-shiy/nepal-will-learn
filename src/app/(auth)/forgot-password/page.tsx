"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForgotPassword } from "@/features/auth/api/use-forgot-password";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = () => {
    const data = {
      email,
    };

    mutate(data, {
      onSuccess: () => {
        router.push("/log-in");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto md:w-[412px] w-full">
      <Card className="w-full md:border border-none my-20">
        <CardHeader>
          <CardTitle>Enter your email</CardTitle>
          <CardDescription>
            The reset link will to send to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center flex-col">
            <Label className="pb-3">Email:</Label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <Button
            className="mt-8 md:w-full"
            type="button"
            onClick={() => onSubmit()}
            disabled={isPending}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
