import bookimg from "";

const BookCard = () => {
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <img className="w-full" src="" alt="product" />
        <h1 className="text-xl font-semibold">
          কুরআন থেকে নেওয়া জীবনের পাঠ (পেপারব্যাক)
        </h1>

        <p>Rating: *****</p>
        <p className="text-sm">Availability: In stock</p>
        <p className="text-sm">Price: TK. 259</p>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
