"use client";

import { PostQuery } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useEffect } from "react";
import { Image } from "antd";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

export default function Post(props: ClientPageProps) {
  const { data } = useTina(props);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg md:prose-xl prose-slate hover:prose-a:text-blue-600 prose-a:transition-colors prose-a:font-medium prose-headings:font-bold prose-headings:tracking-tight prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r prose-blockquote:not-italic prose-pre:bg-[#0d1117] prose-pre:rounded-xl prose-pre:shadow-xl prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 max-w-none">
          <TinaMarkdown
            content={data.post.body}
            components={{
              h1: (p: any) => (
                <h1 className="text-5xl md:text-6xl mt-12 mb-6" {...p} />
              ),
              h2: (p: any) => (
                <h2 className="text-4xl md:text-5xl mt-10 mb-5" {...p} />
              ),
              h3: (p: any) => (
                <h3 className="text-3xl md:text-4xl mt-8 mb-4" {...p} />
              ),
              h4: (p: any) => (
                <h4 className="text-2xl md:text-3xl mt-6 mb-3" {...p} />
              ),
              h5: (p: any) => (
                <h5 className="text-xl md:text-2xl mt-4 mb-2" {...p} />
              ),
              h6: (p: any) => (
                <h6
                  className="text-lg md:text-xl mt-3 mb-2 font-semibold text-gray-600"
                  {...p}
                />
              ),
              code: (p: any) => (
                <code
                  className="font-mono bg-gray-100 text-gray-800 rounded-md px-1"
                  {...p}
                />
              ),
              p: (p: any) => (
                <p
                  className="text-lg leading-relaxed text-gray-700 mb-6"
                  {...p}
                />
              ),

              ul: (p: any) => (
                <ul
                  className="space-y-2 mb-6 pl-6 list-disc marker:text-blue-400"
                  {...p}
                />
              ),
              ol: (p: any) => (
                <ol
                  className="space-y-2 mb-6 pl-6 list-decimal marker:text-blue-400"
                  {...p}
                />
              ),
              li: (p: any) => <li className="pl-2" {...p} />,

              bold: (p: any) => <strong className="font-semibold" {...p} />,
              italic: (p: any) => <em className="italic" {...p} />,
              underline: (p: any) => (
                <span className="underline underline-offset-4" {...p} />
              ),
              strikethrough: (p: any) => (
                <span className="line-through" {...p} />
              ),

              a: (p: any) => (
                <a
                  className="text-blue-500 hover:text-blue-700 underline underline-offset-4"
                  {...p}
                />
              ),

              img: (p: any) => {
                return (
                  <div className="my-8">
                    <Image
                      preview={false}
                      src={p.url}
                      alt={p.alt}
                      className="w-full h-auto rounded-xl border border-gray-300"
                    />
                    {p.caption && (
                      <div className="text-center text-sm text-gray-500 mt-2">
                        {p.caption}
                      </div>
                    )}
                  </div>
                );
              },

              block_quote: (p: any) => (
                <blockquote
                  className="my-8 border-l-4 border-blue-400 bg-gray-50 px-6 py-4 rounded-r text-gray-700"
                  {...p}
                />
              ),

              hr: (p: any) => (
                <hr className="my-8 border-t-2 border-gray-200" {...p} />
              ),

              table: (p: any) => (
                <div className="overflow-x-auto my-8 rounded-lg shadow-sm border border-gray-200">
                  <table className="w-full" {...p} />
                </div>
              ),
              thead: (p: any) => (
                <thead className="bg-gray-50 border-b" {...p} />
              ),
              tbody: (p: any) => (
                <tbody className="divide-y divide-gray-200" {...p} />
              ),
              tr: (p: any) => (
                <tr className="hover:bg-gray-50 transition-colors" {...p} />
              ),
              th: (p: any) => (
                <th
                  className="px-4 py-3 text-left font-semibold text-gray-700 align-top"
                  {...p}
                />
              ),
              td: (p: any) => (
                <td className="px-4 py-3 text-gray-700 align-top" {...p} />
              ),

              code_block: (p: any) => (
                <pre className="my-8 rounded-xl overflow-hidden">
                  <code {...p} />
                </pre>
              ),

              pre: (p: any) => (
                <div className="relative">
                  <pre className="my-8 rounded-xl overflow-hidden" {...p} />
                  <button
                    className="absolute top-4 right-4 bg-white/10 text-white/80 hover:text-white rounded-md px-3 py-1 text-sm font-mono transition-opacity"
                    onClick={() => navigator.clipboard.writeText(p.children)}
                  >
                    Copy
                  </button>
                </div>
              ),
            }}
          />
        </div>
      </article>
    </div>
  );
}
