import React from 'react';
import { Card, IConWithLabel } from '@components/molecules';
import { Image } from '@components/atoms';
import { RequestaDemoForm } from '@components/organisms/request-demo-form/request-demo-form.organism';
import { IoIosCodeWorking } from 'react-icons/io';

function RequestaDemoPage() {
  return (
    <div className="h-screen flex flex-col justify- lg:flex-row gap-10 p-4">
      <div className="w-full flex justify-center items-center">
        <Image src="src/assets/images/request-demo.png" className="max-w-full h-auto" />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-3/5 flex flex-col justify-center items-center gap-4">
          <Card
            title={<IConWithLabel icon={IoIosCodeWorking} size={30} label="Request a Demo Form" />}
            className="max-w-full px-4 pt-0"
          >
            <RequestaDemoForm />
          </Card>
        </div>
      </div>
    </div>
  );
}

export { RequestaDemoPage };
