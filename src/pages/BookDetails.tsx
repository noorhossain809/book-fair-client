/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import bookimg from "../assets/Quran_Theke_Newa_JIboner_Pat-Arif_Azad-d0906-279506.jpg";

const BookDetails = () => {
  const { id } = useParams();

  const { data: book } = useGetSingleBookQuery(id);
  return (
    <div>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300 shadow-lg p-4">
        <div className="w-[40%]">
          <img className="w-full h-72 px-5" src={bookimg} alt="product" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">Name: {book?.data.title}</h1>
          <p>Rating: *****</p>
          <p className="text-sm">Author: {book?.data.author}</p>
          <p className="text-sm">Genre: {book?.data.genre}</p>
          <p className="text-sm">
            Published Date: {book?.data.publicationDate}
          </p>
          <p className="text-sm">Price: TK. 259</p>

          <div className="d-flex space-x-6">
            <Link to={`/edit-book/${id}`}>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto"
              >
                Edit Book
              </button>
            </Link>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
