"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type TicketEditorProps = {
  value: JSONContent | null;                 // store JSON (recommended)
  onChange: (value: JSONContent) => void;
  disabled?: boolean;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "px-2 py-1 rounded border text-sm",
        active ? "bg-muted" : "bg-background",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function TicketEditor({ value, onChange, disabled }: TicketEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
      }),
      Placeholder.configure({
        placeholder: "Enter ticket description…",
      }),
    ],
    content: value ?? { type: "doc", content: [{ type: "paragraph" }] },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[140px] p-3",
      },
    },
  });

  // If the parent resets the form, keep editor in sync
  useEffect(() => {
    if (!editor) return;
    const current = editor.getJSON();
    const incoming = value ?? { type: "doc", content: [{ type: "paragraph" }] };

    // cheap-ish sync check (good enough for forms)
    if (JSON.stringify(current) !== JSON.stringify(incoming)) {
      editor.commands.setContent(incoming, { emitUpdate: false });

    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-muted/20">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          disabled={disabled || !editor.can().chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          disabled={disabled || !editor.can().chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          disabled={disabled || !editor.can().chain().focus().toggleUnderline().run()}
        >
          U
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          disabled={disabled || !editor.can().chain().focus().toggleCode().run()}
        >
          {"</>"}
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          disabled={disabled || !editor.can().chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          disabled={disabled || !editor.can().chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          disabled={disabled || !editor.can().chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (!url) return;
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
          disabled={disabled}
        >
          Link
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={disabled || !editor.isActive("link")}
        >
          Unlink
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
