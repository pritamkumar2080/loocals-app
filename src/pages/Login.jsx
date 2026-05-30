import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await signInWithEmailAndPassword(

          auth,
          email,
          password
        );

        alert(
          "Login Successful ✅"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.message
        );

      } finally {

        setLoading(false);
      }
    };

    const handleForgotPassword =
  async () => {

    if (!email) {

      alert(
        "Enter your email first 😄"
      );

      return;
    }

    try {

      await sendPasswordResetEmail(

        auth,
        email
      );

      alert(
        "Password reset email sent ✅"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.message
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md space-y-5"
      >

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Welcome Back

          </h1>

          <p className="text-slate-500 mt-1">

            Login to continue

          </p>
          

        </div>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none"
          required
        />

        <button
          type="button"
          onClick={
            handleForgotPassword
          }
          className="text-sm text-blue-600 hover:underline"
        >
        
          Forgot Password?
        
        </button>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
        >

          {loading
            ? "Logging In..."
            : "Login"}

        </button>

        <p className="text-center text-slate-500">

          Don’t have an account?

          <Link
            to="/signup"
            className="text-blue-600 ml-2 font-medium"
          >

            Signup

          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;