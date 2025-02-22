import { useGetCurrent } from "@/features/auth/api/use-get-current";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PageLoader } from "./page-loader";
import { ChevronDownIcon } from "lucide-react";


export const UserButton = () => {
  const { data, isLoading } = useGetCurrent();

  if (isLoading) {
    <PageLoader />;
  }

  if (!data) {
    return null;
  }

  const { user } = data;

  const { name , email, profilePic } = user;

  return (
    <div className="py-2 px-2 flex items-center justify-between w-fit gap-3 border rounded-[60px]">
      <div className="flex-col lg:flex hidden">
        <Avatar>
          {profilePic ? (
           
              <AvatarImage
                src={profilePic}
                alt={name}
                className="object-cover"
              />

          ) : (
            <AvatarFallback>{name[0]}</AvatarFallback>
          )}
        </Avatar>
      </div>
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="trancate text-neutral-500 text-xs">{email}</p>
      </div>
      <div>
        <ChevronDownIcon/>
      </div>
    </div>
  );
};
