import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { Helmet } from 'react-helmet';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy(): JSX.Element {
  const navigate = useNavigate();
  const effectiveDate = 'January 1, 2023';
  const companyAddress = '123 Business Ave, Suite 100, Wilmington, DE 19801';
  const contactEmail = 'legal@valt.com';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Valt</title>
        <meta name="description" content="Valt Terms and Conditions for our online testing platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-theme-default shadow-sm rounded-lg p-6 md:p-8">
          <header className="mb-8 border-b border-theme-default-disabled pb-6">
            <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate(-1)}>
              Privacy Policy
            </VTitleWithIcon>
            <VTypography as="p" className="my-4">
              Effective Date: {effectiveDate}
            </VTypography>
          </header>

          <div className="prose prose-lg max-w-none text-theme-secondary">
            <VTypography as="p" className="mb-4">
              This Privacy Policy describes how Valt ("Company", "we", "us", or "our") collects, uses, and discloses
              your information when you use our online testing platform and related services. By accessing or using our
              services, you agree to this policy.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              1. Information We Collect
            </VTypography>
            <ul className="list-disc pl-6 mb-4">
              <li>User account information (name, email, password, etc.)</li>
              <li>Subscription and payment data (billing details, transaction history)</li>
              <li>Test content and activity (created questions, test results, timestamps)</li>
              <li>Device, browser, and log data (IP address, access times, user agent)</li>
            </ul>

            <VTypography as="h4" className="mt-6 mb-2">
              2. How We Use Your Information
            </VTypography>
            <ul className="list-disc pl-6 mb-4">
              <li>To operate and improve our platform</li>
              <li>To manage subscriptions and process payments</li>
              <li>To analyze usage and performance</li>
              <li>To provide support and communicate with you</li>
              <li>To ensure security and prevent abuse</li>
            </ul>

            <VTypography as="h4" className="mt-6 mb-2">
              3. Sharing of Information
            </VTypography>
            <VTypography as="p" className="mb-4">
              We do not sell your personal data. We may share information with:
            </VTypography>
            <ul className="list-disc pl-6 mb-4">
              <li>Trusted third-party service providers (e.g., payment processors, hosting providers)</li>
              <li>Enterprise administrators (for managed enterprise subscriptions)</li>
              <li>Authorities, if required by law or to protect our rights</li>
            </ul>

            <VTypography as="h4" className="mt-6 mb-2">
              4. Data Retention
            </VTypography>
            <VTypography as="p" className="mb-4">
              We retain your data as long as necessary to provide services and comply with legal obligations. You may
              request deletion of your account and associated data by contacting support.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              5. Your Rights
            </VTypography>
            <ul className="list-disc pl-6 mb-4">
              <li>Access and update your personal data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing or withdraw consent</li>
              <li>Export your data (where applicable)</li>
            </ul>

            <VTypography as="h4" className="mt-6 mb-2">
              6. Security
            </VTypography>
            <VTypography as="p" className="mb-4">
              We use reasonable security measures to protect your data, including encryption, access controls, and
              regular audits. No system is 100% secure, and you are responsible for keeping your credentials safe.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              7. Children's Privacy
            </VTypography>
            <VTypography as="p" className="mb-4">
              Our platform is not intended for children under 13. We do not knowingly collect personal data from minors
              without parental consent.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              8. International Users
            </VTypography>
            <VTypography as="p" className="mb-4">
              If you are accessing our services from outside your country, you agree that your data may be processed and
              stored in accordance with this policy and applicable local laws.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              9. Changes to This Policy
            </VTypography>
            <VTypography as="p" className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes via email
              or in-app notification.
            </VTypography>

            <VTypography as="h4" className="mt-6 mb-2">
              10. Contact Us
            </VTypography>
            <VTypography as="p" className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </VTypography>
            <VTypography as="p" className="mb-1">
              Email:{' '}
              <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                {contactEmail}
              </a>
            </VTypography>
            <VTypography as="p" className="mb-1">
              Address: {companyAddress}
            </VTypography>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
