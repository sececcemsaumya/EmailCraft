"use client";
import { usePathname } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/admin/adminlogin";

  return (
    <>
      {!hideNavbar && <AdminNavbar />}
      {children}
    </>
  );
}
