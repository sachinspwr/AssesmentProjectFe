import { Hero, TestFeatures, AdvanceFeatures, SupportFeature, Pricing, ContactUs } from "../components";
import { LandingLayout } from "../layout/landing-layout";

function LandingPage() {
  return (
      <LandingLayout>
        <div
          className={`mx-auto my-8 w-full flex flex-col gap-16
           px-4  // Default padding for mobile (1rem = 16px)
           sm:px-6 // 640px and up (1.5rem = 24px)
           md:px-8 // 768px and up (2rem = 32px)
           lg:px-10 // 1024px and up (2.5rem = 40px)
           xl:px-12 // 1280px and up (3rem = 48px)}`}
        >
          <Hero />
          <TestFeatures />
          <AdvanceFeatures />
          <SupportFeature />
          <Pricing />
          <ContactUs />
        </div>
      </LandingLayout>
  );
}

export { LandingPage };
