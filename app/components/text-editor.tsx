"use client";
import dynamic from "next/dynamic";
import {
  Attachment,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  Excalidraw,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  ImportWord,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  Mention,
  Mermaid,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TableOfContents,
  TaskList,
  TextAlign,
  TextDirection,
  Twitter,
  Underline,
  Video,
  locale,
} from "reactjs-tiptap-editor";
import { Dispatch, SetStateAction, useEffect } from "react";

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const RichTextEditor = dynamic(() => import("reactjs-tiptap-editor"), {
  ssr: false,
});

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    },
  }),
  Video.configure({
    upload: async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: "dracula" }),
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: async (files: File[]) => {
      return Promise.all(
        files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onload = () =>
                resolve({
                  src: reader.result as string,
                  alt: file.name,
                });

              reader.onerror = (error) => reject(error);
            })
        )
      );
    },
  }),
  ExportWord,
  Excalidraw,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    },
  }),
  Mermaid.configure({
    upload: async (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    },
  }),
  Twitter,
];

interface IRichTextProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function RichTextEditorComponent({
  content,
  setContent,
}: IRichTextProps) {

 useEffect(() => {
    setContent(content);
  }, [content]);

  useEffect(() => {
    locale.setLang("pt-BR");
  }, []);

  return (
    <RichTextEditor
      output="html"
      content={content}
      onChangeContent={(value) => setContent(value)}
      dark={false}
      extensions={extensions}
    />
  );
}