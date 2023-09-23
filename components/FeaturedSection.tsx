import React from "react"
import Image from 'next/image';
import getPostMetadata from "@/components/getPostMetadata";
import PostPreview from "@/components/PostPreview";


const FeaturedSection = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview 
      key={post.slug} 
      sketchTitle={post.sketchTitle}
      sketchAuthor={post.sketchAuthor}
      sketchPublishDate={post.sketchPublishDate}
      articleTitle={post.articleTitle}
      articleAuthor={post.articleAuthor}
      articlePublishDate={post.articlePublishDate}
      category={post.category}
      description={post.description}
      bannerImage={post.bannerImage}
      slug={post.slug}
      // {...post} 
    />
  ));

    return (
        <section id="featured">
            <div>
                <h1 className="text-2xl lg:text-3xl font-mono light:text-slate-800 font-bold text-center md:text-left lg:text-left pt-6 pb-0 md:pb-2">Featured sketches</h1>
                {/* <br /> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2 px-4 md:px-0 lg:px-0 md:p-0">
                    {postPreviews}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection
