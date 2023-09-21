import React from "react"
import Image from 'next/image';
import getPostMetadata from "@/components/getPostMetadata";
import PostPreview from "@/components/PostPreview";


const FeaturedSection = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview 
      key={post.slug} 
      title={post.title}
      description={post.description}
      bannerImage={post.bannerImage}
      author={post.author}
      date={post.date}
      slug={post.slug}
      // {...post} 
    />
  ));

    return (
        <section id="featured">
            <div>
                <h1 className="text-xl font-mono font-bold pt-4 px-2">Featured sketches</h1>
                {/* <br /> */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
                    {postPreviews}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection
