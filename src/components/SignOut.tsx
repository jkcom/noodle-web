import { getAuth, inMemoryPersistence } from "firebase/auth";
import { useEffect } from "react";
import { app } from "../firebase/client";
const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

export const SignOut = () => {
  useEffect(() => {
    (async () => {
      await fetch("/api/auth/signout");
      window.location.href = "/";
    })();
  }, []);

  return "Signing out...";
};
