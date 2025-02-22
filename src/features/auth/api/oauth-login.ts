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