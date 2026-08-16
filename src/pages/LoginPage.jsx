import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm bg-surface border border-line rounded-lg p-8">
        <h1 className="font-display font-semibold text-2xl text-brand-dark mb-1">TaskFlow</h1>
        <p className="text-sm text-ink/60 mb-6">Log in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         {/* <Input id="email" type="email" label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required autoFocus />*/}
          <Input id="password" type="password" label="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required error={error} />
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="text-sm text-ink/60 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
