"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";


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
import { useResetPassword } from "@/features/auth/api/use-reset-password";

const ResetPassword = () => {
  const param = useParams();
  const id = param.id as string;
  const router = useRouter();
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useResetPassword();

  const onSubmit = () => {
    const data = {
      password,
    };

    mutate({data , id }, {
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
            <Label className="pb-3">New Password:</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" />
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
  )
}

export default ResetPassword