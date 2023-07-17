/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import bookimg from "../assets/Quran_Theke_Newa_JIboner_Pat-Arif_Azad-d0906-279506.jpg";
import { IProduct } from "../types/globalTypes";

interface IProps {
  book: IProduct;
}

const BookCard = ({ book }: IProps) => {
  return (
    <div>
      <div className="rounded-2xl h-auto flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book?._id}`}>
          <div className="w-max">
            <img className="w-full h-72 px-5" src={bookimg} alt="product" />
          </div>
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p>Rating: *****</p>
        <p className="text-sm">{book?.author}</p>
        <p className="text-sm">{book?.genre}</p>
        <p className="text-sm">Price: TK. 259</p>
      </div>
    </div>
  );
};

export default BookCard;
