export function PrivacyPolicyContent() {
  const policyData = {
    lastUpdated: 'May 28, 2025',
    companyName: 'Valt Technologies',
    contactEmail: 'support@valttechnologies.com',
  };

  const { companyName, lastUpdated, contactEmail } = policyData;

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="px-6 mx-auto max-w-4xl py-5">
        {/* Page Header */}
        <header className="bg-theme-highlight border border-blue-200 rounded-md p-6 mb-10">
          <h1 className="text-2xl font-bold text-theme-brand mb-2">Privacy Policy</h1>
          <p className="text-sm text-theme-brand ">Last updated: {lastUpdated}</p>
        </header>

        <article>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              This Privacy Policy describes how {companyName} ("we", "us", or "our") handles your personal information
              when you access or use our online test platform. We are committed to protecting your privacy and ensuring
              a secure testing experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              When you participate in a test through our platform, we may collect the following types of information:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>
                <strong>Personal Information:</strong> such as your name, email address, or registration ID provided at
                sign-up or test start.
              </li>
              <li>
                <strong>Test Activity:</strong> including your test answers, test progress, and completion status.
              </li>
              <li>
                <strong>Technical Information:</strong> such as your IP address, browser type, device information,
                operating system, and approximate geographic location.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Why We Collect This Information</h2>
            <p className="mb-4">
              The data we collect is essential for providing you with a smooth and secure testing experience.
              Specifically, we use this information to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Authenticate participants and validate test integrity</li>
              <li>Ensure compatibility across devices and browsers</li>
              <li>Improve platform performance and stability</li>
              <li>Detect and prevent fraudulent or suspicious activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Protection & Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to safeguard your data against unauthorized
              access, alteration, or loss. Our security measures include:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Access controls and least-privilege principles</li>
            </ul>
            <p>Access to sensitive data is strictly controlled and limited to authorized personnel only.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Data Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal data. Information may be shared with:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Trusted service providers under strict confidentiality agreements</li>
              <li>Exam administrators solely for the purposes described above</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to request deletion of your data where applicable</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
            </ul>
            <p>To exercise these rights, please contact us at {contactEmail}.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted here with an updated
              effective date. We will notify users of material changes through the platform or via email when
              appropriate.
            </p>
          </section>

          <footer className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at {contactEmail}.
            </p>
            <p className="text-sm text-gray-600 mt-2">Last updated: {lastUpdated}</p>
          </footer>
        </article>
      </main>
    </div>
  );
}

export default PrivacyPolicyContent;
