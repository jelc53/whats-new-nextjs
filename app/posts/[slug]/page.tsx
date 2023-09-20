import fs from "fs";
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
      <div>
        <h1>{post.data.title}</h1>
        <Markdown>{post.content}</Markdown>
      </div>
    );
  };
  
  export default SketchPage