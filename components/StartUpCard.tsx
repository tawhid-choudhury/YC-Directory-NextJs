import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartUpCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    description,
    _id,
    image,
    category,
  } = post;

  return (
    <li className="startup-card group:">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-2">
          <EyeIcon className="size-6 text-primary" />
          <span className="font-medium text-[16px]">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-lg font-semibold text-gray-800 hover:underline">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="Profile Pic"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      {/* Description + image link */}
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt={title} className="startup-card_img" />
      </Link>

      {/* Bottom row: category + button */}
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span className="text-16-medium">{category}</span>
        </Link>
        <Button asChild className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Read More</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartUpCard;
