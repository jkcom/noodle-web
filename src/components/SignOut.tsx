import { getAuth, inMemoryPersistence } from "firebase/auth";
import { app } from "../firebase/client";
const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

export const SignOut = () => {
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/signout");
        window.location.reload();
      }}
    >
      {"Sign out"}
    </button>
  );
};
