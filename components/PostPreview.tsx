import Link from "next/link";
import Image from 'next/image';
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="flex flex-col px-4 py-2 m-2 overflow-hidden border border-gray-200 shadow-lg bg-stone-50 dark:bg-slate-600 rounded-xl">
        <Link href={`/posts/${props.slug}`}>
          <h4 className="pb-2 text-stone-400">{props.sketchAuthor} & {props.sketchReviewer}, {props.sketchPublishDate}</h4>
          <h2 className="pb-2 font-bold hover:text-fuchsia-300 text-fuchsia-800 hover:dark:text-fuchsia-100 dark:text-fuchsia-300">{props.sketchTitle}</h2>
          {/* <h4 className="pb-2">{props.category}</h4> */}
        </Link>
        <Image 
            width={650}
            height={340}
            alt={props.sketchTitle}
            src={`${props.bannerImage}`}
          />
        {/* <p>{props.author}</p> */}
        <p className="py-2">{props.description}</p>
    </div>
  )
};

export default PostPreview;
