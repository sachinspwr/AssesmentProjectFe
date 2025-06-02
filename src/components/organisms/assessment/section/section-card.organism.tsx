import { useState } from 'react';
import { VICon } from '@components/atoms';
import { Card } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { IconType } from 'react-icons';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SectionStats } from './section-stat.organism';
import SectionQuestionsTable from './questions-table.organism';
import { TestSection } from 'models';

interface SectionCardProps {
  section: TestSection;
  onEdit?: (section: TestSection) => void;
  onDelete?: (section: TestSection) => void;
  defaultExpanded?: boolean;
}

interface SectionActionIconProps {
  icon: IconType;
  color: 'brand' | 'negative';
  onClick: () => void;
}

function SectionActionIcon({ icon, color, onClick }: SectionActionIconProps) {
  const colorClass = color === 'brand' ? 'text-theme-brand' : 'text-theme-negative';
  return <VICon icon={icon} size={16} className={`cursor-pointer hover:opacity-80 ${colorClass}`} onClick={onClick} />;
}

export function SectionCard({ section, onEdit, onDelete, defaultExpanded = true }: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasQuestions = section.questions?.length;

  return (
    <Card className="border shadow-sm !p-0">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <VTypography as="h4" className=" truncate">
          {section.name || 'Untitled Section'}
        </VTypography>

        <div className="flex items-center gap-3">
          {hasQuestions && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center gap-1 text-sm text-theme-link hover:underline focus:outline-none"
            >
              <VICon icon={expanded ? FiChevronUp : FiChevronDown} size={24} />
            </button>
          )}
          {onEdit && <SectionActionIcon icon={FiEdit} color="brand" onClick={() => onEdit(section)} />}
          {onDelete && <SectionActionIcon icon={FaRegTrashCan} color="negative" onClick={() => onDelete(section)} />}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-2.5">
        <SectionStats section={section} />
      </div>

      {/* Questions */}
      {expanded && hasQuestions && (
        <div className="overflow-y-auto max-h-[310px] border-t px-4">
          <SectionQuestionsTable mode="view" itemsPerviewMode={100} questions={section.questions ?? []} />
        </div>
      )}
    </Card>
  );
}
