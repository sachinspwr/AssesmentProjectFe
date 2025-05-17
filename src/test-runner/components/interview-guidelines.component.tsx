import { VTypography } from '@components/molecules/typography/v-typography.mol'
import React from 'react'

const InterviewGuidelines = () => {
  return (
    <div>
        <div className="border border-theme-default mb-5 mt-5"></div>
        <VTypography as="h5">Interview Guidelines</VTypography>
        <VTypography as="p" color="muted">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</VTypography>
        <div className="border border-theme-default mb-5 mt-5"></div>
    </div>
  )
}

export default InterviewGuidelines
