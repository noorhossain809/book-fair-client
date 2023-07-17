/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import jwt_decode from "jwt-decode";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IProduct } from "../types/globalTypes";
import AllBooks from "./AllBooks";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="col-span-9 grid lg:grid-cols-4 gap-10 pb-20">
        {data?.data.map((book: IProduct) => (
          <AllBooks book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
