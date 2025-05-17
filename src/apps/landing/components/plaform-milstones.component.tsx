import React from 'react';

function PlaformMilstones() {
  return (
    <div className="container mx-auto my-32 flex flex-col items-center gap-16">
    <div className="grid w-full grid-cols-1 gap-32 lg:grid-cols-2">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-2 text-center ">
          <h2 className="text-3xl font-extrabold leading-7 text-dark-grey-900 md:text-3xl hover:text-blue-300">
            Engine Performance
          </h2>
          <p className="text-base font-medium leading-7 text-dark-grey-600">
            Join the growing number of educators and organizations that rely on our platform
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-4xl font-extrabold leading-tight text-dark-grey-900">
              <span id="countto1">5000</span>+
            </h3>
            <h3 className="text-base font-bold leading-tight text-dark-grey-900">Successful Assessments</h3>
            <p className="text-base font-medium leading-7 text-dark-grey-600">
              successful assessments delivered, ensuring precise results every time.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-4xl font-extrabold leading-tight text-dark-grey-900">
              <span id="countto2">100</span>+
            </h3>
            <h3 className="text-base font-bold leading-tight text-dark-grey-900">Academic Institutes</h3>
            <p className="text-base font-medium leading-7 text-dark-grey-600">
              Trusted by academic institutes for seamless and effective testing solutions
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-4xl font-extrabold leading-tight text-dark-grey-900">
              <span id="countto3" data-decimal="1">
                2.8
              </span>
              k+
            </h3>
            <h3 className="text-base font-bold leading-tight text-dark-grey-900">Clients Worldwide</h3>
            <p className="text-base font-medium leading-7 text-dark-grey-600">
              Serving clients globally, providing cutting-edge assessment technology
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-4xl font-extrabold leading-tight text-dark-grey-900">
              <span id="countto4">500</span>+
            </h3>
            <h3 className="text-base font-bold leading-tight text-dark-grey-900">Daily Visits</h3>
            <p className="text-base font-medium leading-7 text-dark-grey-600">
              Attracting daily visits, our platform is the go-to destination
            </p>
          </div>
        </div>
      </div>
      <div className="hidden rounded-2xl bg-[url('../../src/assets/images/Milestones.png')] bg-cover bg-center lg:block"></div>
    </div>
  </div>
  );
}

export { PlaformMilstones };
