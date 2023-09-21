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
        title: matterResult.data.title,
        author: matterResult.data.author,
        date: matterResult.data.date,
        description: matterResult.data.description,
        bannerImage: matterResult.data.bannerImage,
        slug: fileName.replace(".md", ""),
      };
    });
  
    return posts;
};

export default getPostMetadata;