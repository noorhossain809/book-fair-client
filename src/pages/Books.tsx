/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IProduct } from "../types/globalTypes";
import BookCard from "../components/BookCard";
import jwt_decode from "jwt-decode";
import { ChangeEvent, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const Books = () => {
  const [query, setQuery] = useState("");
  const [queryFilter, setQueryFilter] = useState("");
  const { data } = useGetBooksQuery(
    { query, queryFilter },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("filter", event.target.value);
    setQueryFilter(event.target.value);
  };

  const token: any = window.localStorage.getItem("token");
  const decoded: any = jwt_decode(token);
  const user = decoded.id;

  console.log("user from books", user);
  console.log("data from books", data?.data);

  const userBooks = data?.data.filter((book: any) => book.user === user);
  console.log("books User", userBooks);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="flex  justify-center space-x-6">
          <div>
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                  <BiSearchAlt2 />
                </svg>
              </span>
              <input
                className="placeholder:italic w-96 placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search by Title, Author or Genre..."
                type="text"
                name="query"
                value={query}
                onChange={handleSearch}
              />
            </label>
          </div>
          <div>
            <select
              value={queryFilter}
              onChange={handleQueryFilterChange}
              className="select select-primary w-56 max-w-xs placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            >
              <option selected>Filter</option>
              <option disabled>Genre</option>
              {userBooks?.map((book: IProduct) => (
                <>
                  <option value={book.genre}>{book.genre}</option>
                </>
              ))}
              <option disabled>Publication year</option>
              {userBooks?.map((book: IProduct) => (
                <>
                  <option value={book.publicationDate}>
                    {book.publicationDate}
                  </option>
                </>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-span-9 grid lg:grid-cols-4 gap-10 mt-10 pb-20">
        {userBooks?.map((book: IProduct) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
