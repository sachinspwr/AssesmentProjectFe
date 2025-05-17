import React, { ReactNode } from 'react';

function ButtonOutline({ children }: { children: ReactNode }) {
  return (
    <button className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-blue-300 text-blue-300 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize  hover:text-white-500 transition-all hover:shadow-orange ">
      {' '}
      {children}
    </button>
  );
}

export default ButtonOutline;
