import fs from "fs";
import React from "react";
// import { FC } from "react";
import Image from 'next/image';
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
// import rehypeKatex from 'rehype-katex'
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import ReactMarkdown from "react-markdown";
import getPostMetadata from "@/components/getPostMetadata";

// import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you
// SyntaxHighlighter.registerLanguage('markdown', markdown);

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

type MarkdownProps = {
  markdown: string & { content?: string };
};

// const Markdown: FC<MarkdownProps> = ({ markdown }) => {

//   const MarkdownComponents: object = {
//     // SyntaxHighlight code will go here
//   }

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const SketchPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
    return (
      <div className="flex flex-col items-center justify-center mx-8 md:mx-10 mt-20 lg:mx-[10vw]">
        <div className="text-center">
          <Image 
              width={0}
              height={0}
              sizes="100vw"
              alt={post.data.sketchTitle}
              src={`${post.data.bannerImage}`}
              style={{ width: '100%', height: 'auto' }} // optional
              className="rounded-lg"
            />
            <h1 className="pt-6 pb-2 text-xl md:text-2xl lg:text-3xl lg:pt-10 text-extrabold text-fuchsia-800 dark:text-fuchsia-300">{post.data.sketchTitle}</h1>
            <p className="pb-6 text-lg text-stone-400 dark:text-stone-300 md:text-xl lg:text-2xl">{post.data.sketchAuthor}</p>
        </div>
        
        <article className="w-full prose md:prose-lg lg:prose-xl">
          <ReactMarkdown 
            children={post.content}
            remarkPlugins={[[remarkGfm, remarkMath]]}
            // rehypePlugins={[rehypeHighlight]}
            // components={MarkdownComponents}
          />
        </article>
      </div>
    );
  };
  
  export default SketchPage