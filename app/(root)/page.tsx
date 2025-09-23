import { create } from "domain";
import SearchForm from "../../components/SearchForm";
import { title } from "process";
import StartUpCard from "@/components/StartUpCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);

  return (
    <>
      <div>
        <section className="pink_container ">
          <h1 className="heading">Welcome to YC Directory App</h1>
          <p className="sub-heading">
            Discover and Connect with Y Combinator Startups
          </p>
          <SearchForm query={query} />
        </section>

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search Results for "${query}"` : "All startups"}
          </p>
          <ul className="mt-7 card_grid">
            {posts?.length ? (
              posts.map((post) => <StartUpCard key={post._id} post={post} />)
            ) : (
              <>no post availble</>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}
