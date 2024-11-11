export default function DefaultNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Git Online</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/api/auth/login">Login</a>
          </li>
          <li>
            <details>
              <summary>Learn More</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a href="about">About</a>
                </li>
                <li>
                  <a>Updates</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
