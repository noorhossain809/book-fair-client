import bookimg from "../assets/Quran_Theke_Newa_JIboner_Pat-Arif_Azad-d0906-279506.jpg";
import { IProduct } from "../types/globalTypes";

interface IProps {
  book: IProduct;
}

const BookCard = ({ book }: IProps) => {
  return (
    <div>
      <div className="rounded-2xl h-auto flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <div className="w-max">
          <img className="w-full h-72 px-5" src={bookimg} alt="product" />
        </div>
        <h1 className="text-xl font-semibold">{book?.title}</h1>
        <p>Rating: *****</p>
        <p className="text-sm">{book?.author}</p>
        <p className="text-sm">{book?.genre}</p>
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
