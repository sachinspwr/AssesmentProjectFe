import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Anchor, Blockquote, CodeBlock, Emphasis, H1, H2, H3, H4, HorizontalRule, Image, ListItem, OrderedList, Paragraph, Strong, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, UnorderedList } from './blocks';

interface VMarkdownProps {
    content: string;
    className?: string;
}

function VMarkdown({ content, className }: VMarkdownProps) {
    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        p: Paragraph,
        strong: Strong,
        em: Emphasis,
        ul: UnorderedList,
        ol: OrderedList,
        li: ListItem,
        a: Anchor,
        code: CodeBlock,
        table: Table,
        thead: TableHead,
        tbody: TableBody,
        tr: TableRow,
        th: TableHeaderCell,
        td: TableCell,
        blockquote: Blockquote,
        img: Image,
        hr: HorizontalRule,
    };

    return ( 
        <div className={clsx('vmarkdown-container', className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default VMarkdown;
