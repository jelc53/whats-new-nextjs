import getPostMetadata from "@/components/getPostMetadata";
import PostPreview from "@/components/PostPreview";

const HomePage = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview 
      key={post.slug} 
      title={post.title}
      author={post.author}
      date={post.date}
      slug={post.slug}
      // {...post} 
    />
  ));

  return <div>{postPreviews}</div>;
};

export default HomePage