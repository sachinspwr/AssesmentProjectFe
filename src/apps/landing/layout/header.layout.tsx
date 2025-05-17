import React, { useState, useEffect } from 'react';
import { Link as ScrollLinkBase, LinkProps } from 'react-scroll';
import { VICon } from '@components/atoms';
import { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FaMoneyBill } from 'react-icons/fa6';
import { VHeader } from '@components/organisms';
import { Link } from 'react-router-dom';

// Use ScrollLink as a type-safe component
const ScrollLink = ScrollLinkBase as unknown as React.FC<LinkProps>;

interface NavigationItem {
  sectionId: string;
  displayText: string;
  mobileIcon?: IconType; // We pass icon type (like 'home', 'settings') here
}

function Header() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const desktopNavigationItems: NavigationItem[] = [
    { sectionId: 'about', displayText: 'About' },
    { sectionId: 'features', displayText: 'Features' },
    { sectionId: 'pricing', displayText: 'Pricing' },
    { sectionId: 'contact-us', displayText: 'Contact' },
  ];

  const mobileNavigationItems: NavigationItem[] = [
    { sectionId: 'about', displayText: 'About', mobileIcon: FaHome },
    { sectionId: 'features', displayText: 'Features', mobileIcon: FiSettings },
    { sectionId: 'pricing', displayText: 'Pricing', mobileIcon: FaMoneyBill },
    { sectionId: 'contact-us', displayText: 'Contact Us', mobileIcon: FaMoneyBill },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <VHeader
        showIcons={false}
        className={`fixed top-0 w-full z-30 transition-all ${hasScrolled ? 'shadow-md py-3' : 'py-4'}`}
      >
        <>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex col-span-8 justify-center items-center">
            {desktopNavigationItems.map((item, index) => (
              <>
                <li key={item.sectionId}>
                  <ScrollLink
                    activeClass="active"
                    to={item.sectionId}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onSetActive={() => setActiveSection(item.sectionId)}
                    className={`px-4 py-2 mx-2 cursor-pointer transition-colors ${
                      activeSection === item.sectionId
                        ? 'text-theme-on-primary font-medium'
                        : 'text-theme-on-primary font-medium'
                    }`}
                  >
                    {item.displayText}
                  </ScrollLink>
                </li>
                {index === desktopNavigationItems.length - 1 && (
                  <li className='!w-28'>
                    <Link to="/sign-in" className="px-4 py-2 mx-2 cursor-pointer text-theme-on-primary font-medium">
                      Sign-in
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      </VHeader>

      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 bg-white shadow-lg border-t border-gray-100">
        <ul className="flex justify-around py-2">
          {mobileNavigationItems.map((item) => (
            <li key={item.sectionId}>
              <ScrollLink
                activeClass="active"
                to={item.sectionId}
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={() => setActiveSection(item.sectionId)}
                className={`flex flex-col items-center p-2 text-xs ${
                  activeSection === item.sectionId
                    ? 'text-theme-primary border-t-2 border-theme-primary'
                    : 'text-theme-default'
                }`}
              >
                {/* Dynamically render the icon */}
                <VICon icon={item.mobileIcon} className="w-6 h-6" />
                <span className="mt-1">{item.displayText}</span>
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export { Header };
