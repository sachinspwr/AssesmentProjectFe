import { VCard, VLink } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';
import { FaCog, FaQuestionCircle } from 'react-icons/fa';
import { FaBookOpen, FaChartBar } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

function HelpCenterHomepage() {
  const featureCards = [
    {
      icon: <FaBookOpen className="h-8 w-8 text-theme-brand" />,
      title: 'Getting Started',
      description: 'New to our platform? Learn the basics and set up your first project.',
      link: '/docs/getting-started',
      cta: 'Start Learning',
    },
    {
      icon: <HiOutlineAcademicCap className="h-8 w-8 text-purple-500" />,
      title: 'User Guides',
      description: 'Comprehensive guides for all user roles and features.',
      link: '/docs/user-guides',
      cta: 'Explore Guides',
    },
    {
      icon: <FaCog className="h-8 w-8 text-theme-positive" />,
      title: 'API Reference',
      description: 'Technical documentation for developers and integrators.',
      link: '/docs/api-reference',
      cta: 'View API Docs',
    },
    {
      icon: <FaChartBar className="h-8 w-8 text-theme-warning" />,
      title: 'Analytics',
      description: 'Understand how to interpret and use your data effectively.',
      link: '/docs/analytics',
      cta: 'Learn Analytics',
    },
    {
      icon: <FaQuestionCircle className="h-8 w-8 text-theme-negative" />,
      title: 'FAQs',
      description: 'Answers to common questions and troubleshooting.',
      link: '/docs/faqs',
      cta: 'Find Answers',
    },
    {
      icon: <GrStatusGood className="h-8 w-8 text-theme" />,
      title: 'Best Practices',
      description: 'Pro tips and recommended workflows from our experts.',
      link: '/docs/best-practices',
      cta: 'Optimize Workflow',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <VTypography as='h1' className="">
          Help Center
        </VTypography>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">
          Everything you need to build, manage, and optimize your testing platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((card, index) => (
          <VCard
            key={index}
            className="!p-0 !border-none shadow rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">{card.icon}</div>
                <h2 className="ml-3 text-xl font-semibold text-gray-900">{card.title}</h2>
              </div>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <div className="mt-auto">
                <VLink
                  to={card.link}
                  className=""
                >
                  {card.cta}
                </VLink>
              </div>
            </div>
          </VCard>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 rounded-xl p-8 sm:p-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our support team is ready to help with any questions you have about the platform.
          </p>
          <VLink
            to="/contact-support"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact Support
            <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </VLink>
        </div>
      </div>
    </main>
  );
}

export default HelpCenterHomepage;
