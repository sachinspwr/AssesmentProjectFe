import { TestBriefCard } from '@components/organisms';
import { TestResponseDTO } from '@dto/response';

type TestListProps = DefaultProps & {
  tests: TestResponseDTO[];
};

function TestList({ tests }: TestListProps) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {tests?.map((test) => <TestBriefCard test={test} />)}
      </div>
    </div>
  );
}

export { TestList };
