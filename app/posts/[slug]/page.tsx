import fs from "fs";
import React from "react";
import Image from 'next/image';
import matter from "gray-matter";
import Markdown from '@/components/Markdown'
import getPostMetadata from '@/components/getPostMetadata'


const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
  
};

const SketchPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  // console.log(post);
    return (
  
      <div className="flex flex-col items-center justify-center mx-4 md:mx-8 mt-20 lg:mx-[8vw]">
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
            <p className="pb-6 text-lg text-stone-400 dark:text-stone-300 md:text-xl lg:text-2xl">Reviewed by: {post.data.sketchReviewer}</p>
        </div>
        
        <article className="w-full pb-10 prose lg:pb-16 md:prose-lg lg:prose-xl">
          <Markdown content={post.content} />
        </article>
      </div>
    );
  };
  
  export default SketchPage
