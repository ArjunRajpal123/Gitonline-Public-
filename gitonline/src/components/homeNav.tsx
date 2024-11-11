/* eslint-disable react/jsx-no-comment-textnodes */
export default function HomeNavbar({ profileImg }: { profileImg: string }) {
  return (
    <div className="navbar flex bg-base-100 drop-shadow-sm w-full">
      <div className="flex-1">
        <a href="/home" className="btn btn-ghost text-xl">Git Online Editor</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={profileImg}
                width={40}
                height={40}
              />
            </div>
          </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a href="/api/auth/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
