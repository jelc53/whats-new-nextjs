import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div>
        <Link href={`/sketches/${props.slug}`}>
            <h2>{props.title}</h2>
        </Link>
        <p>{props.author}</p>
        <p>{props.date}</p>
    </div>
  )
};

export default PostPreview;