import React, { useMemo } from 'react';
import { splitAndCapitalize } from '@utils/functions';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestInstruction } from 'test-runner/types';

interface ParticipantInstructionsProps {
  instructions: TestInstruction[];
  groupByCategory?: boolean; // New prop to control grouping
  emptyMessage?: string; // Custom empty message
  title?: string; // Custom title
}

export function PartInstructions({
  instructions,
  groupByCategory = true,
  emptyMessage = 'No instructions available.',
}: ParticipantInstructionsProps) {
  const { grouped, hasCategories } = useMemo(() => {
    if (!groupByCategory) {
      return { grouped: { General: instructions }, hasCategories: false };
    }

    const groups = instructions.reduce((acc: Record<string, TestInstruction[]>, instruction) => {
      const category = instruction.category || 'General';
      if (!acc[category]) acc[category] = [];
      acc[category].push(instruction);
      return acc;
    }, {});

    return {
      grouped: groups,
      hasCategories: Object.keys(groups).length > 1 || !groups['General'],
    };
  }, [instructions, groupByCategory]);

  if (!instructions || instructions.length === 0) {
    return <VTypography>{emptyMessage}</VTypography>;
  }

  const renderInstructionList = (items: TestInstruction[]) => {
    // For grouped view (with bullets)
    if (groupByCategory) {
      return (
        <ul className="ml-4 space-y-2 list-disc list-outside">
          {items.map(({ description }, index) => (
            <li key={`${index}`} className="marker:text-theme-secondary ml-2">
              <VTypography as="p">{description}</VTypography>
            </li>
          ))}
        </ul>
      );
    }

    // For flat view (no bullets, category + description)
    return (
      <ul className="ml-4 space-y-2 list-disc list-outside ">
        {items.map(({ category, description }, index) => (
          <li key={`${index}`} className="list-item">
            <div className="flex gap-1">
              <VTypography as="h6">{splitAndCapitalize(category)}:</VTypography>
              <VTypography as="p">{description}</VTypography>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6 h-[40vh] overflow-y-auto">
      {groupByCategory && hasCategories
        ? Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <VTypography as="h6" className="font-medium text-theme-secondary">
                {splitAndCapitalize(category)}
              </VTypography>
              {renderInstructionList(items)}
            </div>
          ))
        : renderInstructionList(instructions)}
    </div>
  );
}
