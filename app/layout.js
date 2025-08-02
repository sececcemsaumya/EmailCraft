import SessionWrapper from "@/components/sessionwrapper";
import './globals.css';
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminNavbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <main className="main-content">{children}</main>
        </body>
      </SessionWrapper>
    </html>
  );
}
