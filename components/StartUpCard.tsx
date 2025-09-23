import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const StartUpCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name: authorName },
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
          <Link href={`/user/${authorId}`}>
            <p className="text-lg font-semibold text-gray-800 hover:underline">
              {authorName}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="Profile Pic"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt={title} className="startup-card_img" />
        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category.toLowerCase()}`}>
            <span className="text-16-medium">{category}</span>
          </Link>
          <Button className="startup-card_btn">
            <Link href={`/startup/${_id}`}>Read More</Link>
          </Button>
        </div>
      </Link>
    </li>
  );
};

export default StartUpCard;
