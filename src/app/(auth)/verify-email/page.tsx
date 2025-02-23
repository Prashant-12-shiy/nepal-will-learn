"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyEmail } from "@/features/auth/api/use-verify-email";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const { mutate, isPending } = useVerifyEmail();

  const handleSubmit = () => {
    const code = parseInt(value);
    const data = {
      code,
    };
    mutate(data, {
      onSuccess: () => {
        router.push('/');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto md:w-[412px] w-full">
      <Card className="w-full md:border border-none my-20">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the Verification Code Which is send to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator/>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="mt-8 md:w-full"
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
