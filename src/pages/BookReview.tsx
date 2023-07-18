/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, FormEvent } from "react";
import {
  useGetSingleBookQuery,
  usePostReviewBookMutation,
} from "../redux/features/book/bookApi";
import img from "../assets/yunus-tug-aLgOaY8iyJE-unsplash.jpg";
import { FiSend } from "react-icons/fi";
import { toast } from "react-hot-toast";

const BookReview = ({ id }: any) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { data: book } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [postReviewBook] = usePostReviewBookMutation(id);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = {
      id: id,
      data: { reviews: inputValue },
    };
    postReviewBook(options);
    setInputValue("");
    toast.success("comment added successfully");
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10 p-4">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend className="text-indigo-600" />
        </button>
      </form>
      <div className="mt-10">
        {book?.data?.reviews?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <div className="avatar online">
              <div className="w-12 h-12 rounded-full">
                <img src={img} />
              </div>
            </div>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReview;
