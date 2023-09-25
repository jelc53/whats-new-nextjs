import fs from "fs";
import Image from 'next/image';
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/components/getPostMetadata";

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
    return (
      <div className="flex flex-col items-center justify-center mx-10 mt-20 lg:mx-[10vw]">
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
            <h1 className="pt-6 pb-2 text-2xl md:text-3xl lg:text-4xl lg:pt-10 text-extrabold text-fuchsia-800 dark:text-fuchsia-300">{post.data.sketchTitle}</h1>
            <p className="text-stone-400 dark:text-stone-300 md:text-lg lg:text-2xl">{post.data.sketchAuthor}</p>
        </div>
        
        <article className="prose md:prose-lg lg:prose-xl">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    );
  };
  
  export default SketchPage