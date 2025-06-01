import React, { useEffect, useMemo, useRef, useState } from 'react';
import SearchComponent, { SearchComponentRef } from '@components/organisms/search-form/search-form.organism';
import { SearchCriteria, TestRequestDTO } from '@dto/request';
import { TestResponseDTO } from '@dto/response';
import { FormField, FormFieldData } from '@types';
import { getOptionsFromEnum } from '@utils/functions';
import { CategoryOf, MatchOn, Operator, TestQuestionFormat } from '@utils/enums';
import { IoLibrary } from 'react-icons/io5';
import { PiBookOpenUser } from 'react-icons/pi';
import { tokenService } from '@services/token.service';
import { Loader, NoResultsFound, SelectableSummary } from '@components/molecules';
import { Icon, Label } from '@components/atoms';
import { CategoriesCard, DynamicFormHandle, Modal, TestList } from '@components/organisms';
import { MdOutlineAdd } from 'react-icons/md';
import { TestForm } from '@components/organisms/test/test-form/test-form.organism';
import { CategoryForm } from '@components/organisms/category-form/category-form.organism';
import { useNavigate } from 'react-router-dom';
import { GrDocumentTest } from 'react-icons/gr';
import { Pagination } from '@components/organisms/pagination/pagination.organism';
import { pagedResponseDTO } from '@dto/response/page-response';
import { useQueryClient } from 'react-query';
import { FaFolderPlus } from 'react-icons/fa';

type Owner = 'MyTests' | 'Library';

interface TestLayoutProps {
  className?: string;
}

const TestLayout: React.FC<TestLayoutProps> = React.memo(({ className = '' }) => {
  const navigate = useNavigate();
  const formRef = useRef<DynamicFormHandle>(null);
  const [tests, setTests] = useState<TestResponseDTO[]>([]);
  const [showCreateTestForm, setShowCreateTestForm] = useState<boolean>(false);
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('');
  const [owner, setOwner] = useState<Owner>('Library');
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const searchRef = useRef<SearchComponentRef<TestRequestDTO, pagedResponseDTO<TestResponseDTO>>>(null);
  const [currentpage, setCurrentpage] = useState<number>(1);
  const [totalpages, setTotalpages] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const categoryFormRef = useRef<DynamicFormHandle>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const id = tokenService.getValueFromToken('id');
    setUserId(id as string);
  }, []);

  useEffect(() => {
    if (searchRef.current && categoryId) {
      searchRef.current.searchData({
        criteria: [
          {
            field: 'categoryId',
            operator: Operator.AND,
            matchOn: MatchOn.EQUAL,
            value: categoryId,
          },
        ],
        limit: pageSize,
        offset: (currentpage - 1) * pageSize,
      });
    }
  }, [categoryId, currentpage, pageSize]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.searchData({
        criteria: [
          {
            field: owner === 'MyTests' ? 'createdById' : 'isPublic',
            operator: Operator.AND,
            matchOn: MatchOn.EQUAL,
            value: owner === 'MyTests' ? userId! : 1,
          },
        ],
        limit: pageSize,
        offset: (currentpage - 1) * pageSize,
      });
    }
  }, [owner, userId, currentpage, pageSize]);

  const initialCriteria = useMemo<SearchCriteria<TestRequestDTO>[]>(
    () => [
      {
        field: 'tags',
        operator: Operator.OR,
        matchOn: MatchOn.LIKE,
        value: 'Trending',
      },
    ],
    []
  );

  const searchConfig: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter title',
    },
    {
      name: 'testQuestionFormat',
      label: 'Test Question Format',
      type: 'select',
      options: getOptionsFromEnum(TestQuestionFormat),
      placeholder: 'Select test type',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      placeholder: 'Enter tags',
    },
  ];

  const ownerItems = useMemo(
    () => [
      {
        value: 'Library' as Owner,
        summaryItemProps: {
          icon: IoLibrary,
          title: 'Test Library',
          iconClasses: 'text-purple-500',
          content: 'Added by content team',
        },
      },
      {
        value: 'MyTests' as Owner,
        summaryItemProps: {
          icon: PiBookOpenUser,
          title: 'My Tests',
          iconClasses: 'text-blue-500',
          content: 'Your own tests',
        },
      },
    ],
    []
  );

  const handleOnAddQoestion = (formData: FormFieldData) => {
    navigate('/questions', { state: { test: formData } });
  };

  const handlepageChange = (page: number) => {
    if (page > 0 && page <= totalpages) {
      setCurrentpage(page);
    }
  };

  const handleCategoryCreation = () => {
    queryClient.invalidateQueries(['categories', 'Test']);
    setShowCategoryForm(false);
  };

  return (
    <>
      <div className={`relative  w-full flex flex-col min-h-screen bg-skin-theme-light ${className}`}>
        <div className="flex gap-2">
          <Icon icon={GrDocumentTest} size={18} />
          <Label className="text-xl">Tests</Label>
        </div>
        <div className={`w-full p-6 pt-4 px-0 flex flex-row justify-around gap-6 ${className}`}>
          <div className="w-9/12">
            <SearchComponent<TestRequestDTO, pagedResponseDTO<TestResponseDTO>>
              ref={searchRef}
              searchEndpoint="/tests/search"
              formConfig={searchConfig}
              initialCriteria={initialCriteria}
              searchContainerSize={2}
              onResults={(data) => {
                setTests(data.data);
                setTotalpages(Math.ceil(data.totalItems / pageSize));
              }}
              searchBoxBtnProps={[
                {
                  icon: MdOutlineAdd,
                  label: 'CREATE NEW TEST',
                  onClick: () => setShowCreateTestForm(true),
                },
              ]}
            />
            <TestList tests={tests} />
            {searchRef.current?.isLoading && <Loader wrapperClasses="min-h-20" bubbleClasses="bg-skin-theme-invert" />}
            {searchRef.current?.isLoading == false && tests?.length <= 0 && <NoResultsFound />}
            <Pagination currentviewMode={currentpage} totalpages={totalpages} onpageChange={handlepageChange} />
          </div>
          <div className="w-3/12 px-2 flex flex-col gap-5">
            <div className="w-full">
              <SelectableSummary items={ownerItems} selectedValue={owner} onChange={setOwner} />
            </div>

            <div className="w-full flex justify-between items-center">
              {/* Add the ADD CATEGORY  */}
              <Label className="text-skin-theme-dark">APPLY CATEGORY</Label>
              <span
                className="text-blue-700 cursor-pointer hover:underline"
                onClick={() => setShowCategoryForm(true)} // Open the "Add Category" modal
              >
                ADD CATEGORY
              </span>
            </div>
            <div className="w-full">
              <CategoriesCard categoryOf={CategoryOf.Test} onSelect={setCategoryId} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="CREATE TEST"
        isOpen={showCreateTestForm}
        onClose={() => setShowCreateTestForm(false)}
        width={60}
        height={{ value: 510, unit: 'px' }}
        showFooter={false}
        onSubmit={() => formRef.current?.submit()}
        classes={{ body: '!p-0 !m-0 !relative' }}
      >
        <TestForm
          ref={formRef}
          showSubmit={false}
          OnAddQuestion={(formData) => {
            handleOnAddQoestion(formData);
          }}
        />
      </Modal>

      {/* Modal for adding category */}
      <Modal
        title="ADD CATEGORY"
        isOpen={showCategoryForm}
        onClose={() => setShowCategoryForm(false)} // Close modal
        width={40}
        height={{ value: 10, unit: 'px' }}
        okButtonLabel="CREATE CATEGORY"
        okButtonIcon={FaFolderPlus}
        onSubmit={() => categoryFormRef.current?.submit()}
      >
        <CategoryForm categoryOf="Test" ref={categoryFormRef} onDone={handleCategoryCreation} />
      </Modal>
    </>
  );
});

export { TestLayout };
