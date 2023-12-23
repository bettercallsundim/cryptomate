"use client";
import { auth } from "@/app/parts/firebase.config";
import {
  getDataFromLocal,
  removeDataFromLocal,
  setDataToLocal,
} from "@/lib/localStorage";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { memo, useEffect } from "react";

const provider = new GoogleAuthProvider();

const handleSignIn = () => {
  signInWithRedirect(auth, provider);
};

const Login = memo(({ user, setUser }) => {
  const router = useRouter();
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const { name, email, photoURL } = result.user;

        setDataToLocal("user", { name, email, photoURL });
        const user = getDataFromLocal("user");
        if (user?.email) {
          setUser(user);
        }
      })
      .catch((error) => {
        // Handle Errors here.

        console.log(error);
        // ...
      });
  }, []);
  useEffect(() => {
    const user = getDataFromLocal("user");
    if (user?.email) {
      setUser(user);
    }
  }, []);
  return (
    <div>
      {user?.email ? (
        <button
          className="bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white duration-300"
          onClick={() => {
            auth.signOut();
            setUser(null);
            removeDataFromLocal("user");
            router.push("/");
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-900 hover:text-white duration-300"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
});

export default Login;
