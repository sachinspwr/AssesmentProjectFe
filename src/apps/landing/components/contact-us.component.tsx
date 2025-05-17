import { useNavigate } from 'react-router-dom';
import { VFormFieldData, VFormFields } from 'types/form-field';
import { VButton } from '@components/atoms/button/v-button.atom';
import { useState } from 'react';
import { VDynamicForm } from '@components/organisms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useContactUsMutation } from 'store/slices/support.slice';
import { RequestDemoDTO } from '../../dto/request/request-demo-request.dto';

enum ContactSubject {
  General= 'General Inquiry', // For any general questions or information
  Technical= 'Technical Support', // For tech-related issues or help
  Billing = 'Billing & Payments', // For questions related to invoices, payments, etc.
  Feedback = 'Feedback & Suggestions', // For providing suggestions or feedback on service
  Other = 'Other',
}

type ContactFormProps = {
  onCancel?: () => void;
};

export function ContactUs({ onCancel }: ContactFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contactUs] = useContactUsMutation();
  const [formKey, setFormKey] = useState(0);

  const contactFormConfig: VFormFields[] = [
    // Personal Information
    {
      type: 'text',
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      position: '1 1 6',
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      position: '1 7 6',
    },
  
    // Optional Mobile Number
    {
      type: 'number',
      name: 'mobile',
      label: 'Mobile (optional)',
      placeholder: 'Enter your mobile number',
      position: '2 1 6',
    },

    {
      type: 'text',
      name: 'company',
      label: 'Company (optional)',
      placeholder: 'Enter your company',
      position: '2 7 6',
    },
  
    // Subject and Message
    {
      type: 'select',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Select subject',
      required: true,
      options: Object.values(ContactSubject).map((value) => ({
        value,
        label: value,
      })),
      position: '3 1 6',
    },
    {
      type: 'text-area',
      name: 'message',
      label: 'Your Message',
      placeholder: 'Enter your message here...',
      required: true,
      textAreaRows: 5,
      position: '4 1 12',
    },
  
    // Actions
    {
      type: 'discard',
      name: 'cancel',
      label: 'Cancel',
      onClick: () => (onCancel ? onCancel() : navigate(-1)),
      position: '5 1 2',
      classNames: '!w-full',
    },
    {
      type: 'custom',
      name: 'submit',
      position: '5 3 4',
      disabled: isLoading,
      customContent: (
        <VButton type="submit" isLoading={isLoading} className="!w-full">
          Send Message
        </VButton>
      ),
    },
  ];
  
  

  const handleSubmit = async (fieldData: VFormFieldData) => {
    setIsLoading(true);
    try {
      const name = String(fieldData.name || '');
  
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ') || 'NA';

      const requestData: RequestDemoDTO = {
        ...fieldData,
        firstName,
        lastName: lastName || '',
        companySize: '500', // static for now
        roleInCompany: 'Software Developer',
        message: fieldData.message as string,
        comments: fieldData.subject as string,
        status: "Active",
      };
  
      const response = await contactUs(requestData).unwrap();
      console.log('Response:', response);

      // Reset form
      setFormKey((prev) => prev + 1);

      onCancel ? onCancel() : navigate(-1);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section id='contact-us' className='w-full min-h-screen flex justify-center items-center'>
      <div className="w-full md:flex border !rounded-lg">
        {/* Illustration Section */}
        <div className="md:w-2/5 bg-gradient-to-br bg-theme-default-alt rounded-md hidden md:flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-theme-primary mb-4">Contact Us</h2>
            <p className=" mb-8">Have questions or need assistance? Our team is here to help you.</p>
          </div>
          <div className="mt-8 w-full max-w-xs">
            <div className="flex items-center  mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>contact@example.com</span>
            </div>
            <div className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-3/5 px-8 py-6">
          <div className="mb-6">
            <VTypography as="h3">Get in Touch</VTypography>
            <VTypography as="p">Fill out the form below and we'll get back to you as soon as possible.</VTypography>
          </div>

          <VDynamicForm config={contactFormConfig} onSubmit={handleSubmit} spacing={4} key={formKey}/>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
