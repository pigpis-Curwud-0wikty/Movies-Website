import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignupPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setemail] = useState(emailValue || "");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { signup } = useAuthStore();

  const handleSubmit = (eo) => {
    eo.preventDefault();
    signup({ email, username, password });
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex justify-center items-center p-4">
        <Link to="/">
          <h1 className="text-red-700 font-bold text-4xl">EGYBEST</h1>
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white
              focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(eo) => {
                  setemail(eo.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white
              focus:outline-none focus:ring"
                placeholder="johndoe"
                id="username"
                value={username}
                onChange={(eo) => {
                  setusername(eo.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
            hover:bg-red-700"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
