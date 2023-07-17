/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import jwt_decode from "jwt-decode";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { toast } from "react-hot-toast";

type BookFormProps = React.HTMLAttributes<HTMLDivElement>;

interface BookFormInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: string;
}

const AddNewBook = ({ className, ...props }: BookFormProps) => {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem("token");
  const decoded: any = jwt_decode(token);
  const user = decoded.id;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInputs>();

  const [addBook, { isLoading, isSuccess, isError, error }] =
    useAddBookMutation();

  const onSubmit = () => {
    const bookData = {
      title,
      author,
      genre,
      publicationDate,
      user,
    };
    addBook(bookData);
    toast.success("Book added successfully");
    setTitle(""), setAuthor(""), setGenre(""), setPublicationDate("");
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg shadow-slate-300 p-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Add Book
              </h2>
            </div>
            <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="title"
                    placeholder="title"
                    type="name"
                    autoCapitalize="none"
                    autoComplete="title"
                    autoCorrect="off"
                    value={title}
                    {...register("title", { required: "Title is required" })}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <p>{errors.title.message}</p>}
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="author"
                    placeholder="author name"
                    type="name"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register("author", {
                      required: "author is required",
                    })}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {errors.author && <p>{errors.author.message}</p>}
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="genre"
                    placeholder="genre"
                    type="name"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register("genre", {
                      required: "genre is required",
                    })}
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  {errors.genre && <p>{errors.genre.message}</p>}
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="date"
                    placeholder="publicationDate"
                    type="date"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...register("publicationDate", {
                      required: "publicationDate is required",
                    })}
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                  />
                  {errors.publicationDate && (
                    <p>{errors.publicationDate.message}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
