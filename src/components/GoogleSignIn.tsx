import {
  GoogleAuthProvider,
  getAuth,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/client";
const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

export const GoogleSignIn = () => {
  return (
    <button
      onClick={async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const idToken = await userCredential.user.getIdToken();
        await fetch("/api/auth/signin", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        window.location.href = "/";
      }}
    >
      {"Google"}
    </button>
  );
};
