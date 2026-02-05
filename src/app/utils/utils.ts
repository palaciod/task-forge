import type { JSONContent } from "@tiptap/react";

export function tiptapToPlainText(content: JSONContent | null | undefined): string {
  if (!content) return "";

  let text = "";

  const extractText = (node: JSONContent): void => {
    if (node.type === "text" && node.text) {
      text += node.text;
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach((child) => extractText(child));
      // Add line break after block elements
      if (["paragraph", "heading", "listItem"].includes(node.type || "")) {
        text += " ";
      }
    }
  };

  extractText(content);
  
  return text.trim();
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
