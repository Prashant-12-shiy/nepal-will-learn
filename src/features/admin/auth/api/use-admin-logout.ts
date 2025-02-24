import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAdminLogout = () => {
  const router = useRouter();
  
  const logout = () => {
    try {
      // Delete the token cookie
      deleteCookie("nwl-admin-token");

      router.refresh();
      // Redirect to the home page or login page
      router.push("/"); // or router.push("/log-in");

      // Show a success toast
      toast.success("Logged out successfully");

    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return logout;
};