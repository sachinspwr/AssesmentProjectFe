import React from 'react';

function HowItWork() {
  return (
    <div className='w-full '>
      <div className="w-full">
        <div className="container mx-auto my-32 flex flex-col items-center gap-16">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="mb-2 text-3xl font-extrabold leading-tight text-dark-grey-900 lg:text-4xl hover:text-blue-300">
                How Engine works?
              </h2>
              <p className="text-base font-medium leading-7 text-dark-grey-600">
                Our engine leverages advanced algorithms to streamline the entire assessment process.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10 ">
            <div className="flex items-start gap-4  ">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-blue-500 transition hover:bg-purple-blue-600 focus:bg-purple-blue-700"></div>
              <div className="flex flex-col">
                <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">
                  Ignition: Rev Up Registration
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                  kickstart your journey with effortless registration .
                </p>
              </div>
            </div>
            <div className="rotate-90 lg:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
                <g clip-path="url(#clip0_3346_6663)">
                  <path
                    d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                    fill="#68769F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3346_6663">
                    <rect width="42" height="42" fill="white" transform="translate(0.666748)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col">
                <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">Gear Up: Design Your Test</h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                  Craft assessments that meet your specific needs.
                </p>
              </div>
            </div>
            <div className="rotate-90 lg:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
                <g clip-path="url(#clip0_3346_6663)">
                  <path
                    d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                    fill="#68769F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3346_6663">
                    <rect width="42" height="42" fill="white" transform="translate(0.666748)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col">
                <h3 className="mb-2 text-base font-bold leading-tight text-dark-grey-900">
                  Cross the Finish Line: Drive to Results
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                  Achieve success as you receive accurate results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-1"></hr>
    </div>
  );
}

export { HowItWork };
