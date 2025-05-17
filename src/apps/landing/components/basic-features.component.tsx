import React from 'react';

function TestFeatures() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-4 bg-indigo-100 rounded-full text-xs font-semibold text-theme-brand tracking-wide uppercase">
            Key Features
          </span>
          <h3 className="mt-6 text-4xl font-bold text-gray-800 hover:text-theme-brand  transition-colors duration-300 cursor-pointer">
            Empower Your Assessments
          </h3>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Deliver secure, intelligent, and impactful assessments with cutting-edge technology and smart tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="text-center group">
            <div className="bg-theme-primary-lite rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-theme-primary">
              <svg
                className="stroke-theme-primary group-hover:stroke-white transition-all duration-300"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 27.5L15 25M15 25V21.25M15 25L20 27.5M8.75 14.375L12.5998 11.0064C13.1943 10.4862 14.1163 10.6411 14.5083 11.327L15.4917 13.048C15.8837 13.7339 16.8057 13.8888 17.4002 13.3686L21.25 10M2.5 2.5H27.5M26.25 2.5V13.25C26.25 17.0212 26.25 18.9069 25.0784 20.0784C23.9069 21.25 22.0212 21.25 18.25 21.25H11.75C7.97876 21.25 6.09315 21.25 4.92157 20.0784C3.75 18.9069 3.75 17.0212 3.75 13.25V2.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3 capitalize">AI-Powered Proctoring</h4>
            <p className="text-base text-gray-600">
              Real-time behavior monitoring with AI to ensure exam integrity and detect anomalies effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center group">
            <div className="bg-theme-warning-lite rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-theme-warning">
              <svg
                className="stroke-theme-warning group-hover:stroke-white transition-all duration-300"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7.5C2.5 4.73858 4.73858 2.5 7.5 2.5C10.2614 2.5 12.5 4.73858 12.5 7.5C12.5 10.2614 10.2614 12.5 7.5 12.5C4.73858 12.5 2.5 10.2614 2.5 7.5Z"
                  strokeWidth="2"
                />
                <path
                  d="M2.5 22.5C2.5 20.143 2.5 18.9645 3.23223 18.2322C3.96447 17.5 5.14298 17.5 7.5 17.5C9.85702 17.5 11.0355 17.5 11.7678 18.2322C12.5 18.9645 12.5 20.143 12.5 22.5C12.5 24.857 12.5 26.0355 11.7678 26.7678C11.0355 27.5 9.85702 27.5 7.5 27.5C5.14298 27.5 3.96447 27.5 3.23223 26.7678C2.5 26.0355 2.5 24.857 2.5 22.5Z"
                  strokeWidth="2"
                />
                <path
                  d="M17.5 7.5C17.5 5.14298 17.5 3.96447 18.2322 3.23223C18.9645 2.5 20.143 2.5 22.5 2.5C24.857 2.5 26.0355 2.5 26.7678 3.23223C27.5 3.96447 27.5 5.14298 27.5 7.5C27.5 9.85702 27.5 11.0355 26.7678 11.7678C26.0355 12.5 24.857 12.5 22.5 12.5C20.143 12.5 18.9645 12.5 18.2322 11.7678C17.5 11.0355 17.5 9.85702 17.5 7.5Z"
                  strokeWidth="2"
                />
                <path
                  d="M17.5 22.5C17.5 19.7386 19.7386 17.5 22.5 17.5C25.2614 17.5 27.5 19.7386 27.5 22.5C27.5 25.2614 25.2614 27.5 22.5 27.5C19.7386 27.5 17.5 25.2614 17.5 22.5Z"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3 capitalize">Secure Testing Environment</h4>
            <p className="text-base text-gray-600">
              Lockdown browsers and prevent cheating with advanced environment controls during assessments.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center group">
            <div className="bg-theme-positive-lite rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-theme-positive">
              <svg
                className="stroke-theme-positive group-hover:stroke-white transition-all duration-300"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 26.25H26.25M6.25 22.875C4.86929 22.875 3.75 21.8676 3.75 20.625V12.75C3.75 11.5074 4.86929 10.5 6.25 10.5C7.63071 10.5 8.75 11.5074 8.75 12.75V20.625C8.75 21.8676 7.63071 22.875 6.25 22.875ZM15 22.875C13.6193 22.875 12.5 21.8676 12.5 20.625V9.375C12.5 8.13236 13.6193 7.125 15 7.125C16.3807 7.125 17.5 8.13236 17.5 9.375V20.625C17.5 21.8676 16.3807 22.875 15 22.875ZM23.75 22.875C22.3693 22.875 21.25 21.8676 21.25 20.625V6C21.25 4.75736 22.3693 3.75 23.75 3.75C25.1307 3.75 26.25 4.75736 26.25 6V20.625C26.25 21.8676 25.1307 22.875 23.75 22.875Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3 capitalize">Insightful Analytics</h4>
            <p className="text-base text-gray-600">
              Access detailed analytics to track performance, engagement, and improvement areas effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { TestFeatures };
