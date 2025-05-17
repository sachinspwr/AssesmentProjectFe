import { VSearchSelect } from '@components/molecules/search/v-search-select.mol';
import React, { useState } from 'react';
import { useSearchTagsQuery, useCreateTagMutation } from 'store/slices/tag.slice';

type TagSelectorProps = {
  value?: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  wrapperClasses?: string;
  hideLabel?: boolean;
};

function TagSelector({ value = [], onChange, placeholder = 'Search tags...', wrapperClasses, hideLabel = false, }: TagSelectorProps) {
  const [query, setQuery] = useState('');

  const {
    data: tags = [],
    isFetching,
    isError,
  } = useSearchTagsQuery(query, {
    skip: query.length < 2,
  });

  const [createTag, { isLoading: isCreating }] = useCreateTagMutation();
  const [componentKey, setComponentKey] = useState(0);

  const handleAddItem = async (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;

    try {
      const newTag = await createTag({ name: trimmed }).unwrap();
      onChange([...value, newTag.name]);
      setQuery('');
      setComponentKey((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  return (
    <div className={`w-full ${wrapperClasses}`}>
      <VSearchSelect
        {...(!hideLabel && { label: 'Select Tags' })}
        key={componentKey}
        value={value}
        options={(isError ? [] : tags).map((tag) => ({
          label: tag.name,
          value: tag.name,
        }))}
        onChange={onChange}
        onSearch={setQuery}
        loading={isFetching || isCreating}
        placeholder={placeholder}
        onAddItem={(item) => handleAddItem(item)}
      />
    </div>
  );
}

export default TagSelector;
