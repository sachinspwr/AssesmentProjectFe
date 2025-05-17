import React from 'react';
import { NavLink } from 'react-router-dom';

type SidebarProps = {
  classes?: {
    wrapper?: string;
  };
};

function Sidebar({ classes }: SidebarProps) {
  return (
    <div
      className={`group flex flex-col items-center h-full overflow-hidden text-skin-theme transition-all duration-400 shadow-sm ${classes?.wrapper}`}
    >
      <div className="flex flex-col w-16 group-hover:w-40 transition-all duration-500">
        <div className="py-4 flex flex-col justify-center items-center gap-3 border-t border-skin-theme">
          <NavLink
            to="/"
            className="relative flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200"
          >
            <svg
              className="w-8 h-8 fill-current transition-transform duration-500 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </NavLink>
        </div>

        <div className="py-6 px-2 flex flex-col justify-center gap-3 border-t border-skin-theme">
          <NavLink
            to="/dashboard"
            className="w-full flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200"
          >
            <svg
              className="w-7 h-7 stroke-current transition-transform duration-500 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-4 text-md hidden group-hover:block">Dashboard</span>
          </NavLink>

          <NavLink
            to="/questions"
            className="w-full flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200"
          >
            <svg
              className="w-7 h-7 stroke-current transition-transform duration-500 group-hover:scale-110"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="ml-4 text-md hidden group-hover:block">Questions</span>
          </NavLink>

          <NavLink
            to="/tests"
            className="w-full flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200"
          >
            <svg
              className="w-7 h-7 stroke-current transition-transform duration-500 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            <span className="ml-4 text-md hidden group-hover:block">Tests</span>
          </NavLink>
        </div>

        <div className="py-6 px-2 flex flex-col justify-center gap-3 border-t border-skin-theme">
          <NavLink
            to="/support"
            className="w-full flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200"
          >
            <svg
              className="w-7 h-7 stroke-current transition-transform duration-500 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="ml-4 text-md hidden group-hover:block">Support</span>
          </NavLink>

          <NavLink
            to="/user/profile"
            className="w-full flex items-center p-2 hover:bg-skin-theme-dark rounded transition-colors duration-200 mt-auto"
          >
            <svg
              className="w-7 h-7 stroke-current  transition-transform duration-500 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8z"
              />
            </svg>
            <span className="ml-4 text-md hidden group-hover:block ">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
