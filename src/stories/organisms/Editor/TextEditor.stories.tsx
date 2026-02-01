import type { Meta } from "@storybook/react";
import { useState } from "react";
import TicketEditor from "@/app/components/organisms/Editor/TicketEditor";
import { JSONContent } from "@tiptap/react";

const meta = {
  title: "Organisms/Editor/TicketEditor",
  component: TicketEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TicketEditor>;

export default meta;

export const Default = () => {
  const [value, setValue] = useState<JSONContent | null>(null);
  
  return (
    <div className="w-[600px]">
      <TicketEditor value={value} onChange={setValue} />
    </div>
  );
};

export const WithInitialContent = () => {
  const [value, setValue] = useState<JSONContent | null>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is a sample ticket description with ",
          },
          {
            type: "text",
            marks: [{ type: "bold" }],
            text: "bold",
          },
          {
            type: "text",
            text: " and ",
          },
          {
            type: "text",
            marks: [{ type: "italic" }],
            text: "italic",
          },
          {
            type: "text",
            text: " text.",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Feature requirement 1" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Feature requirement 2" }],
              },
            ],
          },
        ],
      },
    ],
  });
  
  return (
    <div className="w-[600px]">
      <TicketEditor value={value} onChange={setValue} />
    </div>
  );
};

export const Disabled = () => {
  const [value] = useState<JSONContent | null>({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This editor is disabled and cannot be edited.",
          },
        ],
      },
    ],
  });
  
  return (
    <div className="w-[600px]">
      <TicketEditor value={value} onChange={() => {}} disabled />
    </div>
  );
};

export const Interactive = () => {
  const [value, setValue] = useState<JSONContent | null>(null);
  
  return (
    <div className="w-[600px] space-y-4">
      <TicketEditor value={value} onChange={setValue} />
      <div className="p-4 bg-muted rounded-md">
        <p className="text-sm font-semibold mb-2">Editor JSON Output:</p>
        <pre className="text-xs overflow-auto max-h-[200px]">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};
