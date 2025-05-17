import React, { useCallback } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import History from '@tiptap/extension-history';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { FaBold, FaCode, FaItalic, FaUnderline } from 'react-icons/fa';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import './editor.style.css';
import { GrOrderedList, GrUnorderedList } from 'react-icons/gr';

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      BulletList,
      OrderedList,
      ListItem,
    ],
    editorProps: {
      attributes: {
        class: 'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
      },
    },
  }) as Editor;

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);
  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {/* Fixed Menubar */}
      <div className="flex flex-col gap-2">
        <button
          className="p-2 text-skin-theme hover:bg-gray-200 rounded"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <FaRotateLeft size={18} />
        </button>
        <button
          className="p-2 text-skin-theme hover:bg-gray-200 rounded"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <FaRotateRight size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          onClick={toggleBold}
        >
          <FaBold size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          onClick={toggleUnderline}
        >
          <FaUnderline size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          onClick={toggleItalic}
        >
          <FaItalic size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          onClick={toggleCode}
        >
          <FaCode size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          onClick={toggleOrderedList}
        >
          <GrOrderedList size={18} />
        </button>
        <button
          className={`p-2 text-skin-theme hover:bg-gray-200 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          onClick={toggleBulletList}
        >
          <GrUnorderedList size={18} />
        </button>
      </div>

      {/* Editor Content */}
      <div>
        <EditorContent editor={editor} className="w-full  border border-gray-300 rounded-lg " />
      </div>
    </div>
  );
}
