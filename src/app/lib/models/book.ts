import mongoose, {Model, Schema} from "mongoose";
import IBook from "@/app/types/booksForSchema";

const BookSchema: Schema<IBook> = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number},
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;