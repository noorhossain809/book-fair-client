/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IProduct } from "../types/globalTypes";
import BookCard from "../components/BookCard";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="col-span-9 grid lg:grid-cols-4 gap-10 pb-20">
        {data?.data.map((book: IProduct) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
