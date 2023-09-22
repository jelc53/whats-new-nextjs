import React from "react"
import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "../components/PostMetadata";

const getPostMetadata = (): PostMetadata[] => {
    const folder = "posts/";
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith(".md"));
    
    // get gray-matter yaml from each md file
    const posts = markdownPosts.map((fileName) => {
      const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
      const matterResult = matter(fileContents);
      // const options = { year: "numeric", month: "long", day: "numeric" };

      return {
        sketchTitle: matterResult.data.sketchTitle,
        sketchAuthor: matterResult.data.sketchAuthor,
        sketchPublishDate: matterResult.data.sketchPublishDate,
        articleTitle: matterResult.data.articleTitle,
        articleAuthor: matterResult.data.articleAuthor,
        articlePublishDate: matterResult.data.articlePublishDate,
        category: matterResult.data.category,
        description: matterResult.data.description,
        bannerImage: matterResult.data.bannerImage,
        slug: fileName.replace(".md", ""),
      };
    });
  
    return posts;
};

export default getPostMetadata;