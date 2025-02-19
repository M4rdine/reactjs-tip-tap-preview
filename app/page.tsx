"use client"
import dynamic from 'next/dynamic';
import 'reactjs-tiptap-editor/style.css'
import 'katex/dist/katex.min.css'
import { useState } from 'react';
const TipTapReact = dynamic(
  () => import("./components/text-editor"),
  { ssr: false },
)

export default function Home() {
  const [content, setContent] = useState("");
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-12 gap-x-4 gap-y-4">
        <div className="grid col-span-12">
        <TipTapReact
          content={content}
          setContent={setContent}
          />
        </div>
        <hr/>

        {/* PREVIEW */}
        <h1>Preview</h1>
        <div className='grid grid-cols-12'>
        <div
        className='grid col-span-12'
          dangerouslySetInnerHTML={{ __html: content as string }}
          />
        </div>
      </div>
    </div>
  );
}
