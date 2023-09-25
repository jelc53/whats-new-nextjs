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
            <div className="mb-auto">
                <h1 className="pt-6 pb-0 font-mono text-2xl font-bold text-center lg:text-3xl light:text-slate-800 lg:text-left md:pb-2">
                    Featured sketches <span className="hidden lg:inline-block">--&gt;</span>
                    <hr className="lg:h-0 w-1/5 mx-auto mt-2 bg-gray-300 border-0 rounded h-[1px]"></hr>
                </h1>
                {/* <br /> */}
                <div className="grid grid-cols-1 px-4 py-2 md:grid-cols-2 lg:grid-cols-4 md:px-0 lg:px-0 md:p-0">
                    {postPreviews}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection
