import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

const getPostContent = (slug: string) => {
  const folder = "sketches/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
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