import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;
const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!post) {
    return notFound();
  }

  const parseContent = md.render(post.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h3 className="heading">{post.title}</h3>
        <p className="sub-heading">{post.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post?.image || "https://placehold.co/600x400"}
          alt={post?.title || "Startup image"}
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-6 mt-10 max-w-4xl mx-auto ">
          <div className="flex-between gap-5">
            <Link
              className="flex gap-2 items-center"
              href={`/user/${post.author?._id}`}
            >
              <Image
                src={post.author?.image || "https://placehold.co/48x48"}
                alt="Profile Pic"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p>
              <span className="category-tag">{post.category}</span>
            </p>
          </div>
          <h3 className="text-30-bold">Post Pitch</h3>
          {parseContent ? (
            <article
              className="prose max-w-4xl"
              dangerouslySetInnerHTML={{ __html: parseContent }}
            />
          ) : (
            <p className="no-result">No pitch available</p>
          )}
        </div>
        <hr className="divider" />

        {/* TODO: EDITOR SELECTED RELATED STARTUPS */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
