import React from 'react';

// eslint-disable-next-line react/function-component-definition
const Footer: React.FC = () => {
  return (
    <footer className="w-full px-8 py-6 bg-theme-default-alt !">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Test Engine</span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-theme-primary uppercase">Resources</h2>
            <ul className="text-theme-secondary font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Guides</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Help Center</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Webinars</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-theme-primary uppercase">Follow Us</h2>
            <ul className="text-theme-secondary font-medium">
              <li className="mb-4">
                <a href="https://github.com/themesberg/flowbite" className="hover:underline">GitHub</a>
              </li>
              <li>
                <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-theme-primary uppercase">Company</h2>
            <ul className="text-theme-secondary font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-700" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-theme-secondary sm:text-center">
          © 2024 <a href="#" className="hover:underline">Valt Technology™</a>. All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:mt-0 sm:justify-center">
          <a href="#" className="text-theme-secondary hover:text-gray-100 mx-3">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Facebook page</span>
          </a>
          <a href="#" className="text-theme-secondary hover:text-gray-100 mx-3">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 21 16"
            >
              <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
            </svg>
            <span className="sr-only">Discord community</span>
          </a>
          <a href="#" className="text-theme-secondary hover:text-gray-100 mx-3">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Twitter page</span>
          </a>
          <a href="#" className="text-theme-secondary hover:text-gray-100 mx-3">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.834-2.714.591-3.339-1.281-3.339-1.281-.452-1.146-1.104-1.44-1.104-1.44-.904-.615.069-.604.069-.604 1 .072 1.537 1.03 1.537 1.03.986 1.716 2.6 1.22 3.241.926.1-.712.389-1.22.707-1.496-2.474-.292-5.075-1.258-5.075-5.599 0-1.238.442-2.248 1.17-3.038-.116-.292-.51-1.492.113-3.125 0 0 .951-.31 3.129 1.172a10.541 10.541 0 0 1 5.661 0c2.18-1.481 3.133-1.172 3.133-1.172.623 1.633.23 2.833.113 3.125.727.79 1.17 1.8 1.17 3.038 0 4.354-2.605 5.307-5.078 5.598.399.345.75.912.75 1.86 0 1.34-.01 2.423-.014 2.753 0 .263.18.572.686.478A9.91 9.91 0 0 0 10 .333Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export  {Footer};
