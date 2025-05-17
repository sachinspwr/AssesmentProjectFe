import React, { ReactNode } from 'react';
import { Footer } from './footer.layout';
import { Header} from './header.layout';


function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export { LandingLayout };
