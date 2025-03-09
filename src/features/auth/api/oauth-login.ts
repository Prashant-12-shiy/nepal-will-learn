// import { endpoints } from "@/lib/endpoint";

// const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
export const useGoogleLogin = () => {
    const loginWithGoogle = () => {
      try {
        // Redirect to the Google OAuth endpoint
        window.location.href = "http://localhost:8080/api/auth/google";
      } catch (error) {
        console.error("Failed to redirect to Google OAuth:", error);
      }
    };
  
    return loginWithGoogle;
  };