/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IProduct } from "../types/globalTypes";
import BookCard from "../components/BookCard";
import jwt_decode from "jwt-decode";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const token = window.localStorage.getItem("token");
  const decoded: any = jwt_decode(token);
  const user = decoded.id;

  console.log("user from books", user);
  console.log("data from books", data?.data);

  const userBooks = data?.data.filter((book: any) => book.user === user);
  console.log("books User", userBooks);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="col-span-9 grid lg:grid-cols-4 gap-10 pb-20">
        {userBooks?.map((book: IProduct) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
