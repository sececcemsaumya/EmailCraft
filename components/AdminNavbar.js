"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminNavbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">CraftMail</Link>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/admin/dashboard">Dashboard</Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </div>
    </nav>
  );
}
