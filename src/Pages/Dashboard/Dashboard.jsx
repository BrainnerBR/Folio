import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bg text-text">
      <h1 className="text-3xl font-bold mb-2">Dashboard privado</h1>
      <p className="text-slate-300 text-sm">
        Estás autenticado como:{" "}
        <span className="font-semibold text-sky-400">{user?.email}</span>
      </p>
    </div>
  );
}
