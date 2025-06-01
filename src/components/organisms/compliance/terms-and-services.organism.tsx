import { VLink } from '@components/atoms';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { Helmet } from 'react-helmet';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function TermsAndServices() {
  const effectiveDate = 'January 1, 2023';
  const companyName = 'Valt Inc.';
  const jurisdiction = 'Delaware, United States';
  const companyAddress = '123 Business Ave, Suite 100, Wilmington, DE 19801';
  const contactEmail = 'legal@valt.com';

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Terms and Services | Valt</title>
        <meta name="description" content="Valt Terms and Conditions for our online testing platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-theme-default shadow-sm rounded-lg p-6 md:p-8">
          <header className="mb-8 border-b border-theme-default-disabled pb-6">
            <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate(-1)}>
              Terms and Conditions
            </VTitleWithIcon>
            <VTypography as="p" className="my-4">
              Effective Date: {effectiveDate}
            </VTypography>
          </header>

          <div className="prose prose-lg max-w-none text-theme-secondary">
            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                1. Acceptance of Terms
              </VTypography>
              <VTypography as="p" className="mb-4">
                Welcome to {companyName}. These Terms and Conditions ("Terms") govern your access to and use of our
                online testing platform, including any content, features, services, and subscriptions (collectively, the
                "Service").
              </VTypography>
              <VTypography as="p">
                By accessing or using the Service, you agree to be bound by these Terms and our{' '}
                <VLink to="/privacy-policy">Privacy Policy</VLink>. If you do not agree to these Terms, you may not use
                the Service.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                2. Eligibility
              </VTypography>
              <VTypography as="p">
                You must be at least 13 years old to use our Service. By using the Service, you represent and warrant
                that:
              </VTypography>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You meet the minimum age requirement</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>Your use of the Service complies with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                3. User Accounts
              </VTypography>
              <VTypography as="p" className="mb-2">
                When creating an account with {companyName}, you agree to:
              </VTypography>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                <li>Promptly update your information if it changes</li>
                <li>Not share or transfer your account credentials</li>
              </ul>
              <VTypography as="p">
                Enterprise accounts may assign administrator roles with additional privileges. Administrators are
                responsible for all activities that occur under their accounts.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                4. Subscriptions and Payments
              </VTypography>
              <VTypography as="h6" className="mb-2">
                4.1 Subscription Plans
              </VTypography>
              <VTypography as="p" className="mb-4">
                We offer various subscription plans for individuals and organizations. All plans are subject to:
              </VTypography>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Automatic renewal at the end of each billing cycle</li>
                <li>Price changes with 30 days notice</li>
                <li>Immediate termination for violation of these Terms</li>
              </ul>

              <VTypography as="h6" className="mb-2">
                4.2 Payment Terms
              </VTypography>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>All fees are non-refundable except as required by law</li>
                <li>Payment processing is handled by our third-party providers</li>
                <li>You are responsible for any taxes associated with your subscription</li>
              </ul>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                5. Acceptable Use
              </VTypography>
              <VTypography as="p" className="mb-4">
                You agree not to use the Service to:
              </VTypography>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or engage in hacking</li>
                <li>Harass, abuse, or harm others</li>
                <li>Circumvent any security measures</li>
              </ul>
              <VTypography as="p">
                We reserve the right to investigate and take appropriate legal action against anyone who violates these
                Terms, including suspending or terminating accounts.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                6. Intellectual Property
              </VTypography>
              <VTypography as="p" className="mb-4">
                The Service and its original content, features, and functionality are owned by {companyName} and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                laws.
              </VTypography>
              <VTypography as="p">
                You retain ownership of content you create using the Service, but you grant us a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify, and display such content for the purpose
                of providing the Service.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                7. Privacy and Data Protection
              </VTypography>
              <VTypography as="p" className="mb-4">
                Our <VLink to="/privacy-policy">Privacy Policy</VLink> explains how we collect, use, and protect your
                personal information. By using the Service, you consent to such processing.
              </VTypography>
              <VTypography as="p">
                For enterprise customers, we offer data processing agreements to comply with GDPR, CCPA, and other
                privacy regulations.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                8. Termination
              </VTypography>
              <VTypography as="p" className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason,
                including if you breach these Terms.
              </VTypography>
              <VTypography as="p">
                Upon termination, your right to use the Service will immediately cease. All provisions of these Terms
                that should survive termination will survive, including ownership provisions, warranty disclaimers, and
                limitations of liability.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                9. Disclaimers
              </VTypography>
              <VTypography as="p" className="mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, OR NON-INFRINGEMENT.
              </VTypography>
              <VTypography as="p">
                We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects will be
                corrected.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                10. Limitation of Liability
              </VTypography>
              <VTypography as="p" className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL {companyName.toUpperCase()}, ITS
                AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              </VTypography>
              <VTypography as="p">
                OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE LAST
                12 MONTHS.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                11. Governing Law
              </VTypography>
              <VTypography as="p" className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of {jurisdiction}, without
                regard to its conflict of law provisions.
              </VTypography>
              <VTypography as="p">
                Any disputes arising from these Terms will be resolved exclusively in the state or federal courts
                located in {jurisdiction}, and you consent to personal jurisdiction in such courts.
              </VTypography>
            </section>

            <section className="mb-8">
              <VTypography as="h4" className="mb-4">
                12. Changes to Terms
              </VTypography>
              <VTypography as="p" className="mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes
                through the Service or via email at least 30 days before they take effect.
              </VTypography>
              <VTypography as="p">
                Your continued use of the Service after changes become effective constitutes acceptance of the new
                Terms.
              </VTypography>
            </section>

            <section>
              <VTypography as="h4" className="mb-4">
                13. Contact Information
              </VTypography>
              <VTypography as="p" className="mb-2">
                If you have any questions about these Terms, please contact us at:
              </VTypography>
              <address className="not-italic">
                <VTypography as="p">{companyName}</VTypography>
                <VTypography as="p">{companyAddress}</VTypography>
                <VTypography as="p">
                  Email:{' '}
                  <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {contactEmail}
                  </a>
                </VTypography>
              </address>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndServices;
