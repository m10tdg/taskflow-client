import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validatePassword(pw) {
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (!/\d/.test(pw)) return "Password must include at least one number";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const pwError = validatePassword(password);
    if (pwError) {
      setError(pwError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Email already in use");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm bg-surface border border-line rounded-lg p-8">
        <h1 className="font-display font-semibold text-2xl text-brand-dark mb-1">TaskFlow</h1>
        <p className="text-sm text-ink/60 mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="email" type="email" label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required autoFocus />
          <Input id="password" type="password" label="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required error={error}
            helpText="At least 8 characters, including a number" />
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-ink/60 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-brand font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
