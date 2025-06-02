import React from 'react';
import { CurrentQuestionView } from './current-question-view.component';
import { TestSectionHeader } from './section-header.component';
import { SectionQuestionNavigator } from './section-question-nav.component';

export function TestSection() {
  return (
    <div className="space-y-6">
      <TestSectionHeader />
      <CurrentQuestionView />
      <SectionQuestionNavigator />
    </div>
  );
}

export default React.memo(TestSection);