import Link from "next/link";
import Image from 'next/image';
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="px-4 py-2 border border-gray-200 bg-stone-50 dark:bg-slate-600 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <Link href={`/posts/${props.slug}`}>
          <h4 className="pb-2 text-stone-400">{props.sketchAuthor}</h4>
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
