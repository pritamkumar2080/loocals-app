import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

import { ref, set } from "firebase/database";
import { db } from "../firebase";
const Signup = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

    const [name, setName] =
  useState("");

const [phone, setPhone] =
  useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSignup =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);
        const userCredential =
  await createUserWithEmailAndPassword(

    auth,
    email,
    password
  );

const user =
  userCredential.user;

  await set(

  ref(
    db,
    `users/${user.uid}`
  ),

  {
  uid: user.uid,

  name: name,

  phone: phone,

  email: user.email,

  createdAt:
    Date.now(),
}
);

        alert(
          "Account Created ✅"
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

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md space-y-5"
      >

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Create Account

          </h1>

          <p className="text-slate-500 mt-1">

            Signup to continue

          </p>

        </div>

        <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none"
  required
/>

<input
  type="tel"
  placeholder="Enter Phone"
  value={phone}
  onChange={(e) =>
    setPhone(e.target.value)
  }
  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none"
  required
/>

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
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition"
        >

          {loading
            ? "Creating..."
            : "Signup"}

        </button>

        <p className="text-center text-slate-500">

          Already have an account?

          <Link
            to="/login"
            className="text-green-600 ml-2 font-medium"
          >

            Login

          </Link>

        </p>

      </form>

    </div>
  );
};

export default Signup;