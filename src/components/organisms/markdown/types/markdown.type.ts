import type { Components } from 'react-markdown';

export interface MarkdownRendererProps {
  markdownText: string;
  className?: string;
}

export type MarkdownComponent = Components;