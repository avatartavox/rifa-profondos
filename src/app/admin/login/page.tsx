"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("admin@promo2032.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await authClient.signIn.email({ email, password }, {
      onSuccess: () => {
        router.push("/admin/prizes");
        router.refresh();
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-brand-purple) 0%, transparent 50%)' }} />
      
      <div className="glass-card-dark p-8 w-full max-w-md relative z-10 border-carnival-green/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Acceso Admin</h1>
          <p className="text-gray-400">Fiesta de la Fantasía 2026</p>
        </div>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-md p-3 text-white focus:border-carnival-green focus:outline-none"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-carnival-green text-black font-bold py-3 rounded-md hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-white text-sm inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver al sitio web
          </Link>
        </div>
      </div>
    </div>
  )
}
