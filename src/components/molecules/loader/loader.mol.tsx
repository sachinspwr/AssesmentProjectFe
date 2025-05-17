import React from 'react';

type LoaderProps = {
  type?: 'global' | 'local';

  bubbleClasses?: ClassName;
  wrapperClasses?: ClassName;
};

function Loader({ type = 'local', bubbleClasses, wrapperClasses }: LoaderProps) {
  return type === 'global' ? (
    <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div
      className={`relative z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-skin-them-invert ${wrapperClasses}`}
    >
      <div className=" grid grid-cols-3 gap-2">
        <div className={`w-4 h-4 bg-skin-theme rounded-full animate-pulse ${bubbleClasses}`}></div>
        <div className={`w-4 h-4 bg-skin-theme rounded-full animate-pulse ${bubbleClasses}`}></div>
        <div className={`w-4 h-4 bg-skin-theme rounded-full animate-pulse ${bubbleClasses}`}></div>
      </div>
    </div>
  );
}

export { Loader };
