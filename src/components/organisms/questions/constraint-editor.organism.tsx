import React, { useState } from 'react';
import { VButton, VCard, VICon } from '@components/atoms';
import { VLabelledDropdown, VLabelledInput } from '@components/molecules';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { PiTrashLight } from 'react-icons/pi';

type Constraint = {
  id: string;
  name: string;
  type: 'range' | 'value' | 'complexity';
  min?: string;
  max?: string;
  value?: string;
};

type ConstraintsEditorProps = {
  initialConstraints?: Constraint[];
  onConstraintsChange: (constraints: Constraint[]) => void;
};

// eslint-disable-next-line react/function-component-definition
const ConstraintsEditor: React.FC<ConstraintsEditorProps> = ({ initialConstraints = [], onConstraintsChange }) => {
  const [constraints, setConstraints] = useState<Constraint[]>(initialConstraints);

  const handleConstraint = (
    action: 'add' | 'remove' | 'update',
    id?: string,
    field?: keyof Constraint,
    value?: string
  ) => {
    let newConstraints = [...constraints];

    if (action === 'add') {
      newConstraints = [
        ...constraints,
        {
          id: Math.random().toString(36).substring(2, 9),
          name: '',
          type: 'range',
          min: '',
          max: '',
        },
      ];
    } else if (action === 'remove' && constraints.length > 1) {
      newConstraints = constraints.filter((c) => c.id !== id);
    } else if (action === 'update' && id && field) {
      newConstraints = constraints.map((c) => (c.id === id ? { ...c, [field]: value } : c));
    }

    setConstraints(newConstraints);
    onConstraintsChange(newConstraints);
  };

  return (
    <div className="space-y-4">
      {constraints.map((constraint, index) => (
        <VCard key={constraint.id} className="shadow-sm p-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <VTypography as="h6">Constraint {index + 1}</VTypography>
            <VICon
              icon={PiTrashLight}
              onClick={() => handleConstraint('remove', constraint.id)}
              size={20}
              className="!w-8 text-theme-negative"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            <VLabelledInput
              name="name"
              label="Constraint Name"
              value={constraint.name}
              onChange={(_, e) => handleConstraint('update', constraint.id, 'name', e!.target.value)}
            />
            <VLabelledDropdown
              name="type"
              label="Constraint Type"
              value={constraint.type}
              options={[
                { value: 'range', label: 'Range' },
                { value: 'value', label: 'Fixed Value' },
                { value: 'complexity', label: 'Complexity' },
              ]}
              onChange={(_, e) => handleConstraint('update', constraint.id, 'type', e!.target.value)}
            />
          </div>

          {constraint.type === 'range' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <VLabelledInput
                name="min"
                label="Minimum Value"
                value={constraint.min}
                onChange={(_, e) => handleConstraint('update', constraint.id, 'min', e!.target.value)}
              />
              <VLabelledInput
                name="max"
                label="Maximum Value"
                value={constraint.max}
                onChange={(_, e) => handleConstraint('update', constraint.id, 'max', e!.target.value)}
              />
            </div>
          )}

          {constraint.type === 'value' && (
            <VLabelledInput
              name="value"
              label="Fixed Value"
              value={constraint.value}
              onChange={(_, e) => handleConstraint('update', constraint.id, 'value', e!.target.value)}
            />
          )}

          {constraint.type === 'complexity' && (
            <VLabelledDropdown
              name="value"
              label="Required Complexity"
              value={constraint.value}
              options={[
                { value: 'O(1)', label: 'O(1) - Constant' },
                { value: 'O(log n)', label: 'O(log n) - Logarithmic' },
                { value: 'O(n)', label: 'O(n) - Linear' },
                { value: 'O(n log n)', label: 'O(n log n)' },
                { value: 'O(n²)', label: 'O(n²) - Quadratic' },
                { value: 'O(n³)', label: 'O(n³) - Cubic' },
                { value: 'O(2^n)', label: 'O(2^n) - Exponential' },
              ]}
              onChange={(_, e) => handleConstraint('update', constraint.id, 'value', e!.target.value)}
            />
          )}
        </VCard>
      ))}

      <VButton type="button" onClick={() => handleConstraint('add')} className="!w-3/12">
        + Add Constraint
      </VButton>
    </div>
  );
};

export default ConstraintsEditor;
