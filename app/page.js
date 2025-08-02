import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <div className="hero">
        <h1 className="main-title">
          Design. Build. <span className="highlight">Send Emails Faster</span> <br />
          With Templates That <br />
          <span className="highlight-red">elevate communication & branding</span>
        </h1>

        <div className="stats">
          <div className="stat-box">
            <strong>1000+</strong>
            <p>Templates Created</p>
          </div>
          <div className="stat-box">
            <strong>100+</strong>
            <p>Active Users</p>
          </div>
          <div className="stat-box">
            <strong>5+</strong>
            <p>Admin Dashboards</p>
          </div>
        </div>

        <div className="button-group">
          <Link href="/user/userlogin">
            <button className="btns fade-in">User</button>
          </Link>
          <Link href="/admin/adminlogin">
            <button className="btns fade-in delay">Admin</button>
          </Link>
        </div>
      </div>

      <div className="background-shapes">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </div>
    </main>
  );
}
