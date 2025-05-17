// import { Button, Checkbox, Input, Text } from '@components/atoms';
// import { LabelledInput } from '@components/molecules';

import { Button, VButton, VInput, VLabel } from '@components/atoms';
import { useRef, useState } from 'react';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { VICon } from '@components/atoms/icon/v-icon.atom';
import { VModal } from '@components/organisms/modal/v-modal.organism';
import { VChip } from '@components/atoms/chip/v-chip.component';
import {
  MdAddBusiness,
  MdCheckCircle,
  MdDashboard,
  MdDownload,
  MdList,
  MdPerson,
  MdRadioButtonChecked,
  MdSave,
  MdUpload,
} from 'react-icons/md';
import { SignUpForm } from '@components/organisms';
import { VStatus } from '@components/atoms/status/v-status.component';
import { VSwitch } from '@components/atoms/switch/v-switch.atom';
import { VAdvanceCard } from '@components/molecules/advance-card/v-advance-card.mol';
import { FaBeer } from 'react-icons/fa';
import { VDropdown } from '@components/molecules/dropdown/v-dropdown.mol';
import { VAlert } from '@components/molecules/alert/v-alert.mol';
import { VListItem } from '@components/atoms/list-item/v-list-item.atom';
import { VDetailedVListItem } from '@components/atoms/list-item/v-detailed-list-item.atom';
import { VTabs, VTabsRef } from '@components/organisms/tabs/v-tab.organism';
import { VRadioButtonGroup } from '@components/molecules/radio-button-group/v-radio-group.mol';
import { VCheckbox } from '@components/molecules/checkbox/v-checkbox.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VLabelledInput } from '@components/molecules/labelled-input/v-labelled-input.mol';
import { VIConButton } from '@components/molecules/icon-button/v-icon-button.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { VIConInput } from '@components/molecules/icon-input/v-icon-input.mol';
import { HomeIcon } from '@components/atoms/icon/icons';
import { VCheckboxGroup } from '@components/molecules/checkbox-group/v-checkbox-group.mol';
import { VLabelledTextArea } from '@components/molecules/labelled-text-area/v-labelled-text-area.mol';
import { VDatePicker } from '@components/molecules/date-picker/v-date-picker.mol';
import { VLabelledDatePicker } from '@components/molecules/date-picker/v-labelled-date-picker.mol';
import { VFileInput, VRating, VSearchBox } from '../molecules';
import { VSocialMedia } from '@components/molecules/social-media/v-social-media.mol';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import toast from 'react-hot-toast';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { VFormFields } from '@types';
import { VToolTip } from '@components/molecules/tooltip/v-tooltoip.mol';
import { VToggleButtonGroup } from '@components/molecules/button-group/v-button-group.mol';
import { VCard } from '@components/atoms/card/v-card.atom';
import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';
import { VSearchSelect } from '@components/molecules/search/v-search-select.mol';
import TagSelector from '@components/organisms/tag-selector/tag-selector.organism';

function ComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filterRef = useRef<VFilterRef>(null);
  const vTabsRef = useRef<VTabsRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const options = [
    {
      label: 'Option 1 (Checkbox)',
      value: 'option1',
      type: 'checkbox', // Set type to 'checkbox'
    },
    {
      label: 'Option 2 (Radio)',
      value: 'option2',
      type: 'radio', // Set type to 'radio'
    },
    {
      label: 'Option 3 (Icon)',
      value: 'option3',
      type: 'icon', // Set type to 'icon'
      icon: <MdCheckCircle size={20} />, // Icon for the 'icon' type option
    },
    {
      label: 'Option 4 (Icon)',
      value: 'option4',
      type: 'icon',
      icon: <MdRadioButtonChecked size={20} />,
    },
  ];

  interface AssessmentData {
    id: number;
    assessmentName: string;
    recruiter: string;
    status: string;
    candidates?: number;
    lastActivity: string;
    creationDate: string;
    actions?: string;
  }

  const assessmentData: AssessmentData[] = [
    {
      id: 1,
      assessmentName: 'Software Engineer Interview',
      recruiter: 'Jane Smith',
      status: 'Active',
      candidates: 120,
      lastActivity: '2023-09-15 14:23',
      creationDate: '2023-08-01',
      actions: 'View Details',
    },
    {
      id: 2,
      assessmentName: 'Product Manager Test',
      recruiter: 'Michael Johnson',
      status: 'Completed',
      candidates: 80,
      lastActivity: '2023-08-30 10:12',
      creationDate: '2023-07-10',
      actions: 'View Results',
    },
    {
      id: 3,
      assessmentName: 'UX Designer Skill Assessment',
      recruiter: 'Emily Davis',
      status: 'Active',
      candidates: 95,
      lastActivity: '2023-09-10 11:45',
      creationDate: '2023-06-20',
      actions: 'View Details',
    },
    {
      id: 4,
      assessmentName: 'Backend Developer Coding Test',
      recruiter: 'David Lee',
      status: 'On-Hold',
      lastActivity: '2023-09-13 09:03',
      creationDate: '2023-05-30',
      actions: 'View Details',
    },
    {
      id: 5,
      assessmentName: 'QA Analyst Job Interview',
      recruiter: 'Sarah Wilson',
      status: 'Active',
      candidates: 110,
      lastActivity: '2023-09-12 16:21',
      creationDate: '2023-08-05',
      actions: 'View Details',
    },
    {
      id: 6,
      assessmentName: 'Marketing Specialist Assessment',
      recruiter: 'John White',
      status: 'Completed',
      candidates: 75,
      lastActivity: '2023-08-25 14:58',
      creationDate: '2023-07-15',
      actions: 'View Results',
    },
  ];

  const columnsConfig: VTableColumn<AssessmentData>[] = [
    {
      key: 'assessmentName',
      label: 'Assessment Name',
      customRender: (row: AssessmentData) => <p className="font-[500]  text-theme-primary">{row.assessmentName}</p>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'recruiter',
      label: 'Recruiter',
      customRender: (row: AssessmentData) => <p className="font-[500] text-theme-primary">{row.recruiter}</p>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (row: AssessmentData) => (
        <VStatus
          label={row.status}
          type={row.status === 'Active' ? 'positive' : row.status === 'On-Hold' ? 'warning' : 'negative'}
        ></VStatus>
      ),
    },
    {
      key: 'candidates',
      label: 'Candidates',
      customRender: (row: AssessmentData) => <span>{row.candidates ?? '_'}</span>,
    },
    {
      key: 'lastActivity',
      label: 'Last Activity',
      customRender: (row: AssessmentData) => <span>{new Date(row.creationDate).toLocaleDateString()}</span>,
    },
    { key: 'creationDate', label: 'Creation Date' },
  ];

  interface QuestionData {
    id: number;
    questionText: string;
    category: string;
    difficulty: string;
    type: string;
    status: string;
    lastUpdated: string;
    createdAt: string;
    actions?: string;
  }

  const questionData: QuestionData[] = [
    {
      id: 1,
      questionText: 'What is the difference between var, let, and const in JavaScript?',
      category: 'JavaScript',
      difficulty: 'Medium',
      type: 'Multiple Choice',
      status: 'Active',
      lastUpdated: '2023-09-15 14:23',
      createdAt: '2023-08-01',
      actions: 'Edit',
    },
    {
      id: 2,
      questionText: 'Explain the concept of closures in JavaScript.',
      category: 'JavaScript',
      difficulty: 'Hard',
      type: 'Descriptive',
      status: 'Reviewed',
      lastUpdated: '2023-08-30 10:12',
      createdAt: '2023-07-10',
      actions: 'View',
    },
    {
      id: 3,
      questionText: 'What are SQL Joins and their types?',
      category: 'Databases',
      difficulty: 'Medium',
      type: 'Multiple Choice',
      status: 'Draft',
      lastUpdated: '2023-09-10 11:45',
      createdAt: '2023-06-20',
      actions: 'Edit',
    },
    {
      id: 4,
      questionText: 'What is the time complexity of binary search?',
      category: 'Algorithms',
      difficulty: 'Easy',
      type: 'Single Choice',
      status: 'Active',
      lastUpdated: '2023-09-13 09:03',
      createdAt: '2023-05-30',
      actions: 'View',
    },
    {
      id: 5,
      questionText: 'Describe the concept of RESTful APIs.',
      category: 'Web Development',
      difficulty: 'Medium',
      type: 'Descriptive',
      status: 'Active',
      lastUpdated: '2023-09-12 16:21',
      createdAt: '2023-08-05',
      actions: 'Edit',
    },
    {
      id: 6,
      questionText: 'What is a React Hook?',
      category: 'React.js',
      difficulty: 'Easy',
      type: 'Multiple Choice',
      status: 'Reviewed',
      lastUpdated: '2023-08-25 14:58',
      createdAt: '2023-07-15',
      actions: 'View',
    },
  ];

  const QuestionsConfig: VTableColumn<QuestionData>[] = [
    {
      key: 'questionText',
      label: 'Question',
      customRender: (row: QuestionData) => <p className="font-[500] text-theme-primary">{row.questionText}</p>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'category',
      label: 'Category',
      customRender: (row: QuestionData) => <p className="text-theme-secondary">{row.category}</p>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      customRender: (row: QuestionData) => (
        <VStatus
          label={row.difficulty}
          type={row.difficulty === 'Easy' ? 'positive' : row.difficulty === 'Medium' ? 'warning' : 'negative'}
        />
      ),
    },
    {
      key: 'type',
      label: 'Type',
      customRender: (row: QuestionData) => <span>{row.type}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (row: QuestionData) => (
        <VStatus
          label={row.status}
          type={row.status === 'Active' ? 'positive' : row.status === 'Draft' ? 'warning' : 'negative'}
        />
      ),
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      customRender: (row: QuestionData) => <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>,
    },
    { key: 'createdAt', label: 'Created At' },
  ];

  const tabs = [
    {
      name: 'tab1',
      label: 'Basic Details',
      content: (
        <>
          <p>This is the content of Tab 1.</p>
          <br></br>
          <VButton className="!w-64" onClick={() => vTabsRef.current?.nextTab()}>
            Go TO Next Tab
          </VButton>
        </>
      ),
    },
    {
      name: 'tab2',
      label: 'Questions',
      content: (
        <p>
          This is the content of Tab 2.
          <VButton className="!w-64" onClick={() => vTabsRef.current?.prevTab()}>
            Go TO Prev Tab
          </VButton>
        </p>
      ),
    },
    {
      name: 'tab3',
      label: 'Candidates',
      content: <p>This is the content of Tab 3.</p>,
    },
  ];

  // Options for the radio buttons
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const occupation = [
    { label: 'Private', value: 'private' },
    { label: 'Government', value: 'govt' },
    { label: 'UnEmployed', value: 'unemployed' },
  ];

  const formConfig: VFormFields[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      position: '1 1 4',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      position: '1 5 4',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      position: '1 9 4',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      position: '2 1 6',
      required: true,
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: <div className="border-b-2 my-auto"></div>,
      position: '3 1 12',
      required: true,
    },
    {
      name: 'correctAnswers',
      type: 'hidden',
    },
    {
      name: 'answers',
      label: 'Add answers options here, mark correct answer with toggle',
      type: 'list',
      placeholder: 'Enter item',
      renderItem: (value, onChange, formData, index) => (
        <>
          <VLabel className="col-span-1">Option {String.fromCharCode(65 + index!)}</VLabel>
          <div className="col-span-2">
            <VInput
              name={`customList[${index}]`}
              onChange={(newValue) => {
                const correctAnswers = (formData?.correctAnswers ?? []) as string[];

                const correctAnswerIndex = correctAnswers.findIndex((x) => x === value);

                if (correctAnswerIndex !== -1) {
                  correctAnswers[correctAnswerIndex] = newValue as string;
                }

                console.log(correctAnswers);
                onChange(newValue, { correctAnswers: correctAnswers });
              }}
            />
          </div>
          <div className="col-span-1 mx-auto">
            <VSwitch
              type="primary"
              onChange={(isToggled) => {
                let updatedCorrectAnswers = (formData?.correctAnswers ?? []) as string[];

                if (isToggled) {
                  updatedCorrectAnswers.push(value as string);
                } else {
                  updatedCorrectAnswers = updatedCorrectAnswers.filter((v) => v !== value);
                }

                const additionalUpdates = {
                  correctAnswers: updatedCorrectAnswers,
                };

                onChange(value, additionalUpdates);
                console.log(additionalUpdates);
              }}
            />
          </div>
        </>
      ),
      position: '4 1 12',
    },
  ];

  const groupConfig: VFormFields[] = [
    {
      type: 'group',
      label: 'Assessment Details',
      position: '1 1 12',
      fields: [
        {
          name: 'firstName',
          label: 'Assessment Title',
          type: 'text',
          position: '2 1 6',
        },
        {
          name: 'lastName',
          label: 'Assessment Duration',
          type: 'text',
          position: '2 7 6', // Positioning the field in grid: row 1, column 5, spanning 4 columns
        },
      ],
    },
    {
      type: 'group',
      position: '3 1',
      label: 'Candidate Registration & Assessment Dates',
      fields: [
        {
          name: 'phone',
          label: 'Reg Close Date',
          type: 'text',
          position: '4 1 12', // Positioning the field in grid: row 3, column 1, spanning 6 columns
        },
        {
          name: 'address',
          label: 'Assessment Date',
          type: 'text',
          position: '4 13', // Positioning the field in grid: row 4, column 1, spanning 6 columns
        },
      ],
    },
    {
      name: 'discard',
      label: 'Discard',
      type: 'discard',
      position: '5 1 1',
    },
    {
      name: 'login',
      label: 'Save & Proceed',
      type: 'submit',
      position: '5 2 2',
    },
  ];

  const filterConfig: VFormFields[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      position: '1 1 3',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      position: '1 4 3',
      required: true,
    },
    {
      name: 'submit',
      label: 'Apply Filters',
      type: 'submit',
      position: '1 7 2',
      classNames: '!mt-8',
    },
    {
      name: 'clear',
      type: 'discard',
      label: 'Clear Filters',
      position: '1 9 2',
      classNames: '!mt-8',
    },
  ];

  return (
    <div className="flex flex-col gap-6  p-10">
      <div className="flex flex-col gap-3">
        <h2 className="my-10 text-lg">V-Typography</h2>
        <div className="flex  gap-4">
          <VTypography as="h1">Test Engine</VTypography>

          <VTypography as="h2">Test Engine</VTypography>

          <VTypography as="h3">Test Engine</VTypography>

          <VTypography as="h4">Test Engine</VTypography>

          <VTypography as="p">Test Engine</VTypography>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="my-10 text-lg">V-TitleWithIcon</h2>
        <div className="flex  gap-4">
          <VTitleWithIcon as="h4" icon={MdAddBusiness}>
            Add New Store
          </VTitleWithIcon>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="my-10 text-lg">V-Input</h2>
        <div className="flex flex-col gap-10">
          <div className="w-full flex gap-2">
            <div className="w-2/6 flex flex-col gap-3">
              Without Label
              <VInput placeholder="Select options" name="dropdown" onChange={() => {}} disabled={false} />
            </div>
            <div className="w-2/6 flex flex-col gap-3">
              With Icon Input
              <VIConInput
                type="text"
                name="username"
                placeholder="Enter your username"
                value="JohnDoe"
                onChange={(value) => console.log(value)}
                iconProps={{ icon: MdSave, size: 20, className: '!text-theme-default' }}
                iconPosition="left"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-2/6 flex flex-col gap-3">
              With Label
              <VLabelledInput
                label="Enter Email"
                placeholder="Select options"
                name="dropdown"
                onChange={() => {}}
                disabled={false}
              />
            </div>

            <div className="w-2/6 flex flex-col gap-3">
              With Help Text
              <VLabelledInput
                label="Enter Email"
                helpText="Please enter domain email"
                placeholder="Select options"
                name="dropdown"
                onChange={() => {}}
                disabled={false}
              />
            </div>

            <div className="w-2/6 flex flex-col gap-3">
              With Error
              <VLabelledInput
                label="Enter Email"
                required={true}
                placeholder="Select options"
                name="Email Id"
                onChange={() => {}}
                disabled={false}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className=" flex flex-col gap-3">
              File Input
              <VFileInput
                name="file"
                accept="image/*"
                required
                showPreview
                onChangeFile={(file) => console.log('Selected file:', file)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-DatePicker</h2>
        <div className="flex gap-10">
          <div className="relative w-2/6 flex flex-col gap-10">
            <VDatePicker onChange={() => {}} />
          </div>
          <div className="relative w-2/6 flex flex-col gap-10">
            <VLabelledDatePicker label="Select Date" onChange={() => {}} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-SearchBox</h2>
        <div className="flex gap-10">
          <VSearchBox
            value={''}
            onChange={(val) => alert(val)}
            placeholder={`Search anything`}
            wrapperClasses="!w-96"
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-SearchSelect</h2>
        <div className="flex gap-10">
          <VSearchSelect
            options={options}
            value={[]}
            onChange={(val) => console.log(val)}
            placeholder={`Search anything`}
            wrapperClasses="!w-96"
          />

          <TagSelector
            value={[]}
            onChange={(val) => console.log(val)}
            placeholder={`Search tags...`}
            wrapperClasses="!w-96"
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-DropDown</h2>
        <div className="w-2/6 flex flex-col gap-10">
          <VDropdown
            options={options}
            isMultiSelect={true} // Allows multi-selection
            placeholder="Select options"
            name="dropdown"
            onChange={() => {}}
            showSearch={true} // Optionally show search box
            disabled={false} // Can be set to true if dropdown should be disabled
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-TextBox</h2>
        <div className="flex flex-col gap-10">
          <VLabelledTextArea
            label="About Urself"
            placeholder="Select options"
            name="About You"
            onChange={() => {}}
            disabled={false} // Can be set to true if dropdown should be disabled
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 ">
        <div>
          <h2 className="my-10 text-lg">V-Checkbox</h2>
          <VCheckbox
            name="agreement"
            label="I accept the terms and conditions"
            value="agreement"
            checked={true} // Default checked value (false for unchecked)
            onChange={() => {}} // Handle change
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 gap-10 text-lg">V-CheckboxGroup</h2>
        <div className="flex flex-col gap-5">
          <VCheckboxGroup
            groupLabel="Vertical"
            name="gender1"
            direction="vertical"
            selectedValues={[]}
            options={occupation}
            onChange={(v) => console.log(v)}
          />
        </div>

        <div className="flex gap-1 mt-6">
          <VCheckboxGroup
            groupLabel="Horizontal"
            name="occupation1"
            direction="horizontal"
            selectedValues={['private']}
            options={occupation}
            onChange={(v) => console.log(v)}
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 gap-10 text-lg">V-RadioGroup</h2>
        <div className="flex flex-col gap-5">
          <VRadioButtonGroup
            groupLabel="Vertical"
            name="gender"
            options={genderOptions}
            onChange={(v) => console.log(v)}
          />
        </div>

        <div className="flex gap-1 mt-6">
          <VRadioButtonGroup
            groupLabel="Horizontal"
            name="occupation"
            defaultValue="govt"
            options={occupation}
            onChange={(v) => console.log(v)}
            direction="horizontal"
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Buttons</h2>
        <div className="flex gap-5">
          <div className="flex flex-col items-center  gap-3">
            <VButton>Create Test</VButton>
            <VTypography as="h5">Primary </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VButton variant="secondary">Create Test</VButton>
            <VTypography as="h5">Secondary </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VButton variant="positive">Create Test</VButton>
            <VTypography as="h5">Positive </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VButton variant="negative">Create Test</VButton>
            <VTypography as="h5">Negative </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VButton variant="link">Create Test</VButton>
            <VTypography as="h5">Link </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VIConButton iconProps={{ icon: MdDownload }}>Download</VIConButton>
            <VTypography as="h5">Primary Icon </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VIConButton variant="secondary" iconProps={{ icon: MdUpload }}>
              Upload
            </VIConButton>
            <VTypography as="h5">Secondary Icon </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VIConButton variant="positive" iconProps={{ icon: MdSave }}>
              Save
            </VIConButton>
            <VTypography as="h5">Positive Icon </VTypography>
          </div>

          <div className="flex flex-col items-center gap-3">
            <VButton isLoading={true} variant="primary">
              Saving
            </VButton>
            <VTypography as="h5">Loading </VTypography>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="my-10 text-lg">V-Button Group</h2>
        <div className="w-full grid grid-cols-12 gap-6 my-6">
          <div className="flex col-span-3 flex-col gap-2">
            <VToggleButtonGroup
              options={['Option 1', 'Option 2', 'Option 3']} // Pass the options array
              size="md" // Optional: Set size to 'sm' or 'md'
              onChange={(v) => {
                alert(v);
              }} // Optional: Callback for when selection changes
            />
            <VTypography as="h5">Primary</VTypography>
          </div>
          <div className=" col-span-3 flex flex-col gap-2">
            <VToggleButtonGroup
              variant="secondary"
              options={['Option 1', 'Option 2', 'Option 3']} // Pass the options array
              size="md" // Optional: Set size to 'sm' or 'md'
              onChange={() => {}} // Optional: Callback for when selection changes
            />
            <VTypography as="h5">Secondary</VTypography>
          </div>
          <div className=" col-span-3 flex flex-col gap-2">
            <VToggleButtonGroup
              variant="positive"
              options={['Option 1', 'Option 2', 'Option 3']} // Pass the options array
              size="md" // Optional: Set size to 'sm' or 'md'
              onChange={() => {}} // Optional: Callback for when selection changes
            />
            <VTypography as="h5">Positive</VTypography>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 my-6">
          <div className="col-span-3 flex flex-col gap-2">
            <VToggleButtonGroup
              variant="negative"
              options={['Option 1', 'Option 2', 'Option 3']} // Pass the options array
              size="md" // Optional: Set size to 'sm' or 'md'
              onChange={() => {}} // Optional: Callback for when selection changes
            />
            <VTypography as="h5">Negative</VTypography>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <VToggleButtonGroup
              variant="link"
              options={['Option 1', 'Option 2', 'Option 3']} // Pass the options array
              size="md" // Optional: Set size to 'sm' or 'md'
              onChange={() => {}} // Optional: Callback for when selection changes
            />
            <VTypography as="h5">Link</VTypography>
          </div>

          <div className="flex col-span-4 flex-col gap-2">
            <VToggleButtonGroup
              options={[
                'Option 1',
                <div className="w-40 flex items-center gap-2">
                  <span>🔧</span> Custom Option
                </div>,
                <span>
                  <VICon icon={MdList}></VICon>
                </span>,
              ]}
              size="md"
              variant="primary"
              onChange={(selected, index) => console.log(selected, index)}
            />

            <VTypography as="h5">Custom Content</VTypography>
          </div>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Switch</h2>
        <div className="flex gap-10">
          <VSwitch type="default" label="Default" onChange={() => {}} />
          <VSwitch type="positive" label="Positive" onChange={() => {}} />
          <VSwitch type="negative" label="Negative" onChange={() => {}} />
          <VSwitch type="primary" label="Info" onChange={() => {}} />
          <VSwitch type="warning" label="Warning" onChange={() => {}} />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-ToolTip</h2>
        <div className="flex gap-10">
          <VToolTip content="This is a tooltip! adding more comp here and all" position="top">
            <VButton>Hover Me Now Again aand Again</VButton>
          </VToolTip>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Chip</h2>
        <div className="flex gap-10">
          <VChip id="1" type="default" label="Default" onRemove={() => {}} />
          <VChip id="1" type="positive" label="Positive" onRemove={() => {}} />
          <VChip id="1" type="negative" label="Negative" onRemove={() => {}} />
          <VChip id="1" type="primary" label="Info" onRemove={() => {}} />
          <VChip id="1" type="warning" label="Warning" onRemove={() => {}} />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Status</h2>
        <div className="flex gap-10">
          <VStatus label="Default" />
          <VStatus type="positive" label="Positive" />
          <VStatus type="negative" label="Negative" />
          <VStatus type="primary" label="Info" />
          <VStatus type="warning" label="Warning" />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Rating</h2>
        <div className="flex gap-10">
          Read Mode
          <VRating
            starCount={5}
            starvalue={3.5} // You can set a half rating as well
            onChange={(rating) => console.log('Selected rating:', rating)}
            className="my-rating-class"
          />
          Input Mode
          <VRating
            starCount={5}
            onChange={(rating) => console.log('Selected rating:', rating)}
            className="my-rating-class"
            isInputMode={true}
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Rating</h2>
        <div className="flex gap-10">
          Social Media
          <VSocialMedia className="my-rating-class" showLinkedIn={false} />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Alert</h2>
        <div className="flex justify-between my-2">
          <VAlert type="default" message="Email verified successfully" />
          <VAlert type="positive" message="Email verified successfully" />
          <VAlert type="negative" message="Invalid EmailId" />
          <VAlert type="primary" message="Just to let u know" />
          <VAlert type="warning" message="This could create an issue" />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">React Toast</h2>
        <div className="flex w-3/6 justify-between my-2 gap-10">
          <VButton variant="secondary" onClick={() => toast.success('User Added')} label="Show Success" />
          <VButton variant="secondary" onClick={() => toast.error('Something Went Wrong')} label="Show Error" />
          <VButton
            variant="secondary"
            onClick={() => toast.custom(<VAlert type="negative">Custom Error Message</VAlert>)}
            label="Show Custom"
          />
        </div>
      </div>

      <div className="w-full">
        <h2 className="my-10 text-lg">V-Icon</h2>
        <div className="w-full flex gap-10">
          <p className="flex gap-2">
            From React Icon Library
            <VICon
              type="react-icons"
              icon={MdPerson}
              size={24}
              onClick={() => console.log('Clicked')}
              className="mx-2 text-theme-positive"
            />
          </p>
          <p className="flex gap-2">
            Svg from own library
            <VICon
              type="svg"
              svg={HomeIcon}
              size={40}
              color="blue"
              className="hover:scale-105"
              onClick={() => console.log('Home Icon Clicked')}
            />
          </p>
          <VTitleWithIcon
            title="Svg As Inline"
            type="svg"
            svg={
              <svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.8418 9.33333H12.3333V1.33333H1.66659V10.2567L2.8418 9.33333ZM3.30295 10.6667L0.333252 13V0.666667C0.333252 0.29848 0.631732 0 0.999919 0H12.9999C13.1281 0 13.6666 0.29848 13.6666 0.666667V10C13.6666 10.1282 13.1281 10.6667 12.9999 10.6667H3.30295ZM6.33325 7.33333H7.66658V8.66667H6.33325V7.33333ZM4.71146 3.87564C4.92417 2.80613 5.86792 2 6.99992 2C8.28858 2 9.33325 3.04467 9.33325 4.33333C9.33325 5.622 8.28858 6.66667 6.99992 6.66667H6.33325V5.33333H6.99992C7.55219 5.33333 7.99992 4.8856 7.99992 4.33333C7.99992 3.78105 7.55219 3.33333 6.99992 3.33333C6.51478 3.33333 6.11032 3.67882 6.01912 4.13718L4.71146 3.87564Z"
                  fill="#616160"
                />
              </svg>
            }
            className="w-fit"
            as="h3"
          >
            Svg As Inline
          </VTitleWithIcon>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Loader</h2>
        <div className=" flex gap-10">
          Small spinner
          <VLoader size="sm" />
          Medium spinner <VLoader size="md" />
          Large spinner
          <VLoader size="lg" />
          Small Dotted <VLoader type="dotted" size="sm" />
          Medium Dotted <VLoader type="dotted" size="md" />
          Large Dotted <VLoader type="dotted" size="lg" />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-ListItem</h2>
        <div className="flex flex-col gap-2">
          <VListItem label="Test Assessment" value="option2" type="icon" icon={MdAddBusiness} onClick={() => {}} />
          <VListItem
            active={true}
            label="Dashboard"
            value="option2"
            type="icon"
            icon={MdDashboard}
            onClick={() => {}}
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-DetailedListItem</h2>
        <div className="flex flex-col gap-10">
          <VDetailedVListItem
            title="Monday Night Plans"
            label="Coffe with Karan"
            description="This is first episode aired I am going to watch it"
            icon={FaBeer}
            onClick={() => {}}
            index={1}
          ></VDetailedVListItem>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Tabs</h2>
        <div className="flex flex-col gap-10">
          <VTabs ref={vTabsRef} tabs={tabs} />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Card</h2>
        <div className="flex flex-row gap-10">
          <VCard muted={true}>
            <VDynamicForm
              config={formConfig} // Pass the config for the form fields
              onSubmit={(v) => console.log(v)} // Handle form submission
            />
          </VCard>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Advance</h2>
        <div className="flex flex-row gap-10">
          <VAdvanceCard
            title="Important Notice"
            ariaLabel="Important Notification Card"
            className="max-w-lg mx-auto "
            headerClassName="text-theme-primary"
            bgColor="bg-theme-default-alt"
            borderColor="border-theme-default"
            shadow={true}
          >
            <p>This is an important notification. Please read carefully.</p>
          </VAdvanceCard>

          <VAdvanceCard
            title="Important Notice"
            ariaLabel="Important Notification Card"
            className="max-w-lg mx-auto "
            headerClassName="text-theme-primary"
            bgColor="bg-theme-negative-lite"
            borderColor="border-theme-negative"
            shadow={true}
          >
            <p>This is an important notification. Please read carefully.</p>
          </VAdvanceCard>

          <VAdvanceCard
            title="Important Notice"
            ariaLabel="Important Notification Card"
            className="max-w-lg mx-auto "
            headerClassName="text-theme-primary"
            bgColor="bg-theme-positive-lite"
            borderColor="border-theme-default"
            shadow={true}
          >
            <p>This is an important notification. Please read carefully.</p>
          </VAdvanceCard>
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Table</h2>
        <div className="flex flex-col gap-6">
          <VTable<AssessmentData>
            title="Test Assessment(View Mode)"
            data={assessmentData}
            columns={columnsConfig}
            headerClassName="font-[600]"
            itemsPerPage={5}
            tableClassName="w-full border border-gray-200"
            emptyState={<div>No users found!</div>}
            actionsConfig={[
              {
                action: 'edit',
                responder: (id?: string) => {
                  alert(`Edit clicked for id: ${id}`);
                },
              },
              {
                action: 'delete',
                responder: (id?: string) => {
                  console.log('Delete clicked for id:', id);
                },
              },
              {
                action: 'create',
                label: 'Add Assessment',
                responder: () => {
                  console.log('Add User clicked');
                },
              },
            ]}
          />

          <VTable<QuestionData>
            title="Test Assessment(Select Mode)"
            data={questionData}
            columns={QuestionsConfig}
            getId={(x) => String(x.id)}
            mode="select"
            headerClassName="font-[600]"
            itemsPerPage={5}
            tableClassName="w-full border border-gray-200"
            emptyState={<div>No users found!</div>}
            onSelect={(selectedIds) => alert(selectedIds)}
          />
        </div>
        x``
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="my-10 text-lg">V-DynamicForm</h2>

        <div className="flex justify-between my-2">
          <VDynamicForm
            config={formConfig} // Pass the config for the form fields
            onSubmit={(v) => console.log(v)} // Handle form submission
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-DynamicForm(With Group)</h2>
        <div className="flex justify-between my-2">
          <VDynamicForm
            config={groupConfig}
            onSubmit={(v) => console.log(v)} // Handle form submission
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <h2 className="my-10 text-lg">V-Filter</h2>

        <div className="w-full flex flex-col justify-between my-2">
          {/* Toggle button that shows or hides filter */}
          <div className="flex gap-6 items-center">
            <VDropdown
              options={[{ label: 'last week', value: 'lw' }]}
              name="filter"
              placeholder="Select Date"
              onChange={() => {}}
              wrapperClasses="!w-1/6"
            ></VDropdown>
            <VRadioButtonGroup
              name="group"
              options={[
                { label: 'Test Engine Library', value: 'ter' },
                { label: 'My Own Questions', value: 'mq' },
              ]}
              defaultValue="ter"
              direction="horizontal"
              onChange={() => {}}
              wrapperClasses={'!w-fit'}
            ></VRadioButtonGroup>
            <VFilterToggle ref={filterButtonRef} filterRef={filterRef} />
          </div>

          <VFilter
            ref={filterRef}
            filterConfig={filterConfig}
            filterToggleRef={filterButtonRef}
            onApplyFilter={(v) => console.log(v)}
            notchPositionFromLeft={10}
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">React Toast</h2>
        <div className="flex w-3/6 justify-between my-2 gap-10">
          <VButton variant="secondary" onClick={() => toast.success('User Added')} label="Show Success" />
          <VButton variant="secondary" onClick={() => toast.error('Something Went Wrong')} label="Show Error" />
          <VButton
            variant="secondary"
            onClick={() => toast(<VAlert type="negative" message="This is a custom toast!" />, {})}
            label="Show Custom"
          />
        </div>
      </div>

      <div>
        <h2 className="my-10 text-lg">V-Modal</h2>
        <div className="flex flex-col gap-10">
          <div className="flex justify-center items-center">
            <div className="App">
              <header className="App-header">
                <Button onClick={() => setIsModalOpen(!isModalOpen)}>This is new Modal comp click to open model</Button>
              </header>
              <VModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
                title="Create Test"
                width={50}
                onSubmit={() => {}}
              >
                <SignUpForm />
              </VModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ComponentsPage };
