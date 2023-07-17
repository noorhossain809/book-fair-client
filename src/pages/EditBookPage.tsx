/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  useAddBookMutation,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import jwt_decode from "jwt-decode";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { toast } from "react-hot-toast";

import img1 from "../assets/yunus-tug-aLgOaY8iyJE-unsplash.jpg";
import img2 from "../assets/yunus-tug-fypgaGyv6Bs-unsplash.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import "./style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import "swiper/css/effect-coverflow";

// import required modules
import {
  Scrollbar,
  Autoplay,
  EffectCoverflow,
  Pagination,
} from "swiper/modules";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ToastContent from "../components/ui/Toast";

type BookFormProps = React.HTMLAttributes<HTMLDivElement>;

interface BookFormInputs {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: string;
}

const EditBookPage = ({ className, ...props }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInputs>();

  const { id } = useParams();

  const { data: book } = useGetSingleBookQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  console.log(book);

  const [title, setTitle] = useState(book?.data?.title);
  const [author, setAuthor] = useState(book?.data?.author);
  const [genre, setGenre] = useState(book?.data?.genre);
  const [publicationDate, setPublicationDate] = useState(
    book?.data?.publicationDate
  );

  const [updateBook, { error, isError, isSuccess }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const onSubmit = () => {
    const token: any = window.localStorage.getItem("token");
    const decoded: any = jwt_decode(token);
    const user = decoded.id;
    console.log("user", user);

    if (book?.data?.user === user) {
      const bookData = {
        id: id,
        title,
        author,
        genre,
        publicationDate,
      };
      console.log(bookData);
      updateBook(bookData);
      {
        isSuccess === true
          ? toast.error("You cannot updated this book")
          : toast.success("Book updated successfully");
      }
    }
    navigate(`/book-details/${id}`);
    setTitle(""), setAuthor(""), setGenre(""), setPublicationDate("");
  };

  console.log("error", error);

  return (
    <div>
      {/* <div className="container mx-auto right-0 bg-orange-400 p-12">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar, Autoplay, EffectCoverflow]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className=" h-64" src={img1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div> */}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg shadow-slate-300 p-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Edit Book
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
                    defaultValue={title}
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

            {/* {isError && (
              <div className="alert alert-error mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )} */}

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

export default EditBookPage;
