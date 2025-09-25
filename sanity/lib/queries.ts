import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[
    _type == "startup" 
    && defined(slug.current) 
    && (
      !defined($search) || 
      title match $search || 
      category match $search || 
      author->name match $search
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    views,
    _createdAt,
    category,
    "slug": slug.current,
    "image": image,
    description,
    author->{
      _id,
      name,
      image,
      username,
      bio
    }
  }
`);

export const STARTUPS_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  title,
  views,
  _createdAt,
  category,
  slug,
  image,
  description,
  pitch,
  author->{
    _id,
    name,
    image,
    username,
    bio
  }
}`);

export const STARTUPS_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  views
}`);
