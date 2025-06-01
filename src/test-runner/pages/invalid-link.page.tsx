import React from 'react';
import { Link } from 'react-router-dom';
function InvalidLinkPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-lg text-gray-700 mb-6">
        <b>Oops!</b> This link seems to be invalid or has expired. Please reach out to your inviter for a new one.
      </p>
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Return to Home page
      </Link>
    </div>
  );
}

export { InvalidLinkPage };
