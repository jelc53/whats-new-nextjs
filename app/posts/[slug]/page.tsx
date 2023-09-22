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
      <div className="mt-20 mx-10">
        <div className="text-center">
          <Image 
              width={0}
              height={0}
              sizes="100vw"
              alt={post.data.sketchTitle}
              src={`${post.data.bannerImage}`}
              style={{ width: '100%', height: 'auto' }} // optional
            />
            <h1 className="text-2xl lg:text-4xl pt-6 lg:pt-10 pb-2 text-extrabold text-fuchsia-800 dark:text-fuchsia-300">{post.data.sketchTitle}</h1>
            <p className="text-stone-400 dark:text-stone-300 lg:text-2xl">{post.data.sketchAuthor}</p>
        </div>
        
        <article className="prose lg:prose-xl">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    );
  };
  
  export default SketchPage