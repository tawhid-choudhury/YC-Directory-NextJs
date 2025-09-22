import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <div>
        <section className="pink_container">
          <h1 className="heading">Welcome to YC Directory App</h1>
          <p className="sub-heading">
            Discover and Connect with Y Combinator Startups
          </p>
          <SearchForm query={query} />
        </section>
      </div>
    </>
  );
}
