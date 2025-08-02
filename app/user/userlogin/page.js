"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated frontend auth
    if (email && password) {
      router.push("/user/templates");
    } else {
      alert("Please enter both email and password.");
    }
  };

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/user/templates" });
  };

  return (
    <div className="login-page">
      <div className="head">
        <p>User Login</p>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">Login</button>
      </form>

      <p className="or">or</p>

      <button onClick={handleGithubLogin} className="btn github">
        Sign in with GitHub
      </button>
    </div>
  );
}
