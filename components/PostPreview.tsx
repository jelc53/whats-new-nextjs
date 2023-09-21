import Link from "next/link";
import Image from 'next/image';
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="px-4 py-2 border border-gray-300 bg-stone-200 dark:bg-slate-600 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <Link href={`/posts/${props.slug}`}>
          <h2 className="font-bold">{props.title}</h2>
          <h4 className="italic">{props.author}</h4>
        </Link>
        <Image 
            width={650}
            height={340}
            alt={props.title}
            src={`${props.bannerImage}`}
          />
        {/* <p>{props.author}</p> */}
        <p>{props.description}</p>
    </div>
  )
};

export default PostPreview;
