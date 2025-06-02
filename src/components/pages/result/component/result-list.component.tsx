import { VStatus } from "@components/atoms";
import { VTableColumn } from "@components/organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { UserTestResultResponseDTO } from "@dto/response/user-test-result.response.dto";
import { ResultStatus } from "@utils/enums";
import { defaultFormatDtTm } from "@utils/index";
import { useNavigate } from "react-router-dom";

const results = [
  {
    id: "1",
    testId: "test-1",
    testTitle: "JavaScript Fundamentals",
    userId: "user-1",
    participantId: "participant-1",
    userFirstName: "Alice",
    userLastName: "Smith",
    userEmail: "alice@example.com",
    totalQuestions: 20,
    correctAnswersCount: 18,
    score: "90",
    outOf: "100",
    isPassed: true,
    correctionPercentage: "90%",
    feedback: "Well done!",
    status: ResultStatus.Passed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    testId: "test-2",
    testTitle: "React Basics",
    userId: "user-2",
    participantId: "participant-2",
    userFirstName: "Bob",
    userLastName: "Johnson",
    userEmail: "bob@example.com",
    totalQuestions: 15,
    correctAnswersCount: 9,
    score: "60",
    outOf: "100",
    isPassed: false,
    correctionPercentage: "60%",
    feedback: "Needs improvement.",
    status: ResultStatus.Failed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    testId: "test-1",
    testTitle: "JavaScript Fundamentals",
    userId: "user-1",
    participantId: "participant-1",
    userFirstName: "Alice",
    userLastName: "Smith",
    userEmail: "alice@example.com",
    totalQuestions: 20,
    correctAnswersCount: 18,
    score: "90",
    outOf: "100",
    isPassed: true,
    correctionPercentage: "90%",
    feedback: "Well done!",
    status: ResultStatus.Passed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    testId: "test-2",
    testTitle: "React Basics",
    userId: "user-2",
    participantId: "participant-2",
    userFirstName: "Bob",
    userLastName: "Johnson",
    userEmail: "bob@example.com",
    totalQuestions: 15,
    correctAnswersCount: 9,
    score: "60",
    outOf: "100",
    isPassed: false,
    correctionPercentage: "60%",
    feedback: "Needs improvement.",
    status: ResultStatus.Failed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    testId: "test-1",
    testTitle: "JavaScript Fundamentals",
    userId: "user-1",
    participantId: "participant-1",
    userFirstName: "Alice",
    userLastName: "Smith",
    userEmail: "alice@example.com",
    totalQuestions: 20,
    correctAnswersCount: 18,
    score: "90",
    outOf: "100",
    isPassed: true,
    correctionPercentage: "90%",
    feedback: "Well done!",
    status: ResultStatus.Passed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    testId: "test-2",
    testTitle: "React Basics",
    userId: "user-2",
    participantId: "participant-2",
    userFirstName: "Bob",
    userLastName: "Johnson",
    userEmail: "bob@example.com",
    totalQuestions: 15,
    correctAnswersCount: 9,
    score: "60",
    outOf: "100",
    isPassed: false,
    correctionPercentage: "60%",
    feedback: "Needs improvement.",
    status: ResultStatus.Failed,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function ResultList() {
  const navigate = useNavigate();

  const columns: VTableColumn<UserTestResultResponseDTO>[] = [
    { key: "testTitle", label: "Assessment Title", sortable: true, searchable: true },
    { key: "userFirstName", label: "First Name", sortable: true, searchable: true },
    { key: "userLastName", label: "Last Name", sortable: true, searchable: true },
    {
      key: "status",
      label: "Status",
      customRender: (row) => (
        <VStatus
          label={row.status}
          type={
            row.status === ResultStatus.Passed
              ? "positive"
              : row.status === ResultStatus.Under_Review
              ? "warning"
              : "negative"
          }
        />
      ),
    },
    {
      key: "completedAt",
      label: "Completed At",
      customRender: (row) => <span>{defaultFormatDtTm(row.completedAt)}</span>,
      sortable: true,
      searchable: true,
    }
  ];

  return (
    <VTable
      title="Result"
      data={results}
      columns={columns}
      itemsPerPage={5}
      loading={false}
      emptyState={<div>No Dummy Results Found!</div>}
      getId={(x) => x.id}
      tableClassName="table-fixed w-full"
    />
  );
}

export default ResultList;
