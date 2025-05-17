import { NoSections } from './no-sections.organism';
import { SectionCard } from './section-card.organism';
import { VButton } from '@components/atoms';
import { TestSection } from 'models';

interface SectionListProps {
  testSections: TestSection[];
  onEditSection: (section: TestSection) => void;
  onDeleteSection: (section: TestSection) => void;
  onAddSection: () => void;
}

export function SectionList({ testSections, onEditSection, onDeleteSection, onAddSection }: SectionListProps) {
  if (testSections.length === 0) {
    return (
      <div className="flex justify-center my-12">
        <NoSections onAddSection={onAddSection} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {testSections.map((section) => (
        <SectionCard
          key={section.id || section.name}
          section={section}
          onEdit={onEditSection}
          onDelete={onDeleteSection}
          defaultExpanded={true}
        />
      ))}

      <div className="flex justify-center my-4">
        <VButton variant="primary" className="!w-40" onClick={onAddSection}>
          Add Section
        </VButton>
      </div>
      <hr />
    </div>
  );
}
