import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 p-4 flex justify-between items-center bg-zinc-950">
        <h1 className="text-xl font-bold text-carnival-green">Admin Panel</h1>
        <nav className="flex gap-4">
          <Link href="/admin" className="hover:text-carnival-purple transition-colors">Dashboard</Link>
          <Link href="/admin/prizes" className="hover:text-carnival-purple transition-colors">Premios</Link>
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">Volver al sitio</Link>
        </nav>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
