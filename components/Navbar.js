"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserNavbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">CraftMail</Link>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/user/templates">Templates</Link>
        <Link href="/user/saved">Saved Templates</Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </div>
    </nav>
  );
}
