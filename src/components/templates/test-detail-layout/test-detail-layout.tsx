import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TestResponseDTO } from '@dto/response';
import { useQuery } from 'react-query';
import { apiService } from '@services/api.service';
import { Card, Loader } from '@components/molecules';
import {
  Column,
  CreateLinkForm,
  Modal,
  Table,
  Tabs,
  TestIntro,
  TestInvitationForm,
  TestLinkList,
  TestResult,
} from '@components/organisms';
import { Button, Icon, Label } from '@components/atoms';
import { FaClipboardCheck } from 'react-icons/fa6';
import { FcInvite } from 'react-icons/fc';
import { PiCallBell } from 'react-icons/pi';
import { IoIosLink } from 'react-icons/io';
import { LuUsers } from 'react-icons/lu';
import BulkUserInvite from '@components/organisms/bulk-user-invite/bulk-user-invite.organism';

function TestOverview() {
  const inviteUserForTestRef = useRef<{ submit: () => void }>(null);
  const createLinkForTestRef = useRef<{ submit: () => void }>(null);
  const { testId } = useParams<{ testId: string }>();
  const [showInviteUserForm, setShowInviteUserForm] = useState<boolean>(false);
  const [showCreateLinkForm, setShowCreateLinkForm] = useState<boolean>(false);
  const [showExelSelectPreviewForm, setExelSelectPreviewForm] = useState<boolean>(false);
  const { data: test, isLoading } = useQuery<TestResponseDTO, Error>(
    ['test', testId],
    async () => await apiService.get<TestResponseDTO>(`tests/${testId}`)
  );

  const columns: Column[] = [
    {
      header: 'Question Text',
      accessor: 'questionText',
    },
    {
      header: 'Subject',
      accessor: 'subject',
    },
    {
      header: 'Topic',
      accessor: 'topic',
    },
    {
      header: 'Difficulty',
      accessor: 'difficulty',
    },
    {
      header: 'Question Type',
      accessor: 'type',
    },
    {
      header: 'Time Limit',
      accessor: 'timeLimit',
      contentPosition: 'center',
    },
    {
      header: 'Marks',
      accessor: 'marks',
      contentPosition: 'center',
    },
  ];

  const tabs = [
    {
      name: 'overview',
      label: 'OVERVIEW',
      content: <>{!isLoading && <TestIntro test={test!} />}</>,
    },
    {
      name: 'questions',
      label: 'QUESTIONS',
      content: (
        <div>
          <Table
            classes={{ wrapper: 'bg-skin-theme rounded-lg border border-skin-theme' }}
            varient={{ border: 'all', hover: 'row' }}
            showIndex={true}
            keySelector="id"
            columns={columns}
            data={test?.questions ?? []}
          />
        </div>
      ),
    },
    {
      name: 'links',
      label: 'LINKS',
      content: (
        <div>
          <TestLinkList defaultTestLinks={[]} />
        </div>
      ),
    },
    {
      name: 'results',
      label: 'RESULTS',
      content: (
        <div>
          <TestResult defaultTestResults={[]} />
        </div>
      ),
    },
  ];

  return (
    <>
      {!isLoading && (
        <div className="w-full pt-10 min-h-screen flex flex-col lg:gap-3 2xl:gap-6 ">
          <Card className="container shadow-sm  !min-w-full !p-1 !px-3 ">
            <div className="w-full flex justify-between items-center">
              <Label className="text-2xl text-skin-theme-dark flex gap-2 font-normal">
                <Icon icon={FaClipboardCheck} /> {test?.title}
              </Label>
              <div className="flex gap-4">
                <Button
                  varient="bordered"
                  className="flex justify-center items-center gap-2 transition-transform ease-in duration-100  hover:scale-105 focus:ring-0 cursor-pointer"
                  onClick={() => setShowCreateLinkForm(true)}
                >
                  <Icon icon={IoIosLink} />
                  <Label className="cursor-pointer">CREATE INVITATION LINK</Label>
                </Button>
                <Button
                  varient="bordered"
                  className="flex justify-center items-center gap-2 transition-transform ease-in duration-100 hover:scale-105  focus:ring-0 cursor-pointer"
                  onClick={() => setShowInviteUserForm(true)}
                >
                  <Icon icon={FcInvite} />
                  <Label className="cursor-pointer">INVITE</Label>
                </Button>

                <Button
                  varient="bordered"
                  className="flex justify-center items-center gap-2 transition-transform ease-in duration-100 hover:scale-105  focus:ring-0 cursor-pointer"
                  onClick={() => setExelSelectPreviewForm(true)}
                >
                  <Icon icon={LuUsers} />
                  <Label className="cursor-pointer">INVITE USERS</Label>
                </Button>
              </div>
            </div>
          </Card>

          <Tabs tabs={tabs} />

          {showInviteUserForm && test && (
            <Modal
              title="INVITE USER"
              isOpen={showInviteUserForm}
              okButtonLabel="INVITE"
              okButtonIcon={PiCallBell}
              onSubmit={() => inviteUserForTestRef.current?.submit()}
              onClose={() => setShowInviteUserForm(false)}
            >
              <TestInvitationForm
                testId={testId!}
                ref={inviteUserForTestRef}
                onDone={() => setShowInviteUserForm(false)}
              />
            </Modal>
          )}

          {showCreateLinkForm && test && (
            <Modal
              title="CREATE TEST LINK"
              isOpen={showCreateLinkForm}
              okButtonLabel="CREATE LINK"
              okButtonIcon={IoIosLink}
              onSubmit={() => createLinkForTestRef.current?.submit()}
              onClose={() => setShowCreateLinkForm(false)}
            >
              <CreateLinkForm test={test} ref={createLinkForTestRef} onDone={() => setShowCreateLinkForm(false)} />
            </Modal>
          )}

          {/* Invite Bulk Users */}
          {showExelSelectPreviewForm && test && (
            <Modal
              title="INVITE BULK USERS"
              isOpen={showExelSelectPreviewForm}
              width={60}
              height={{ value: 510, unit: 'px' }}
              showFooter={false}
              onClose={() => setExelSelectPreviewForm(false)}
            >
              <BulkUserInvite testId={''} />
            </Modal>
          )}

          <div className="relative">{isLoading && <Loader />}</div>
        </div>
      )}
    </>
  );
}

export { TestOverview };
