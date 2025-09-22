import React from "react";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <div>
      <form
        action="/"
        className="search-form w-full flex items-center justify-between gap-3 "
      >
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search by name, domain, location, market..."
          className="search_input"
        />

        <div className="flex items-center gap-3">
          {query && <SearchFormReset />}
          <button type="submit" className="search_button">
            <Search className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
