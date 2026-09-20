import { useEffect } from "react";
import AuthFormClient from "../../components/AuthFormClient";

export default function LoginPage() {
  // Menggantikan fitur metadata milik Next.js
  useEffect(() => {
    document.title = "Autentikasi - Smart Pest Trap";
  }, []);

  return (
    <div className="py-12 px-4 flex-1 flex items-center justify-center bg-slate-100">
      <AuthFormClient />
    </div>
  );
}
