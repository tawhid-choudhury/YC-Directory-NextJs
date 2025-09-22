"use client";
import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset} className="w-full flex">
      <Link href={"/"} className="search_button">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
