import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
import { getRandomFloat } from "../../utils/getRandomId";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SocialLogin = () => {
  const [signInWithGoogle, user, gloading, error] = useSignInWithGoogle(auth);
  useEffect(() => {
    const findUser = async () => {
      if (user) {
        try {
          console.log("response.data");
          const response = await axios.get(
            `http://localhost:5001/api/v1/user`,
            {
              params: {
                email: user.email,
              },
            }
          );

          if (response.data) {
            console.log(response.data);
            return;
          } else {
            const registrationResponse = await axios.post(
              "http://localhost:5001/api/v1/user/register",
              {
                email: user.email,
                password: "123456",
                name: user.displayName,
                userId: getRandomFloat(1, 100, 2),
              }
            );

            console.log("User registered:", registrationResponse.data);
          }
        } catch (error) {
          console.error("Error in findUser:", error.message);
        }
      }
    };

    findUser();
  }, [user]);

  if (gloading) {
    return <Loading />;
  }
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { uid, displayName, email } = result.user;
      if (email) {
        try {
          console.log(uid, email, displayName);
          const response = await axios.post(
            "http://localhost:5001/api/v1/user/register",
            {
              name: displayName,
              email: email,
              password: 123456,

              userId: getRandomFloat(1, 100, 2),
            }
          );
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  return (
    <div>
      {" "}
      <button
        className="google-login-button rounded"
        onClick={() => handleGoogleSignIn()}
      >
        <span className="google-login-icon">G</span>
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
