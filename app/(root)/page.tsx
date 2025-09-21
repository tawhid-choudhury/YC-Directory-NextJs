import { Search } from "lucide-react";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
    <div>

      <section className="pink_container">
        <h1 className="heading">
          Welcome to YC Directory App
        </h1>
        <p className="sub-heading">Discover and Connect with Y Combinator Startups</p>
        <SearchForm />
      </section>


    </div>
    </>
  );
}
