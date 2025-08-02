"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/user/userlogin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
