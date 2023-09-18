import fs from "fs";
import Link from "next/link";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostMetadata";

const getPostMetadata = (): PostMetadata[] => {
  const folder = "sketches/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  
  // get gray-matter yaml from each md file
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`sketches/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      author: matterResult.data.author,
      date: matterResult.data.date,
      // hero_image: matterResult.data.hero_image,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
};

const HomePage = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <div>
      <Link href={`/sketches/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.author}</p>
      <p>{post.date}</p>
    </div>
  ));

  return <div>{postPreviews}</div>;
};

export default HomePage