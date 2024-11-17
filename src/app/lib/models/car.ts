import mongoose, {Model, Schema} from "mongoose";
import ICar from '@/app/types/carsForSchema'

const CarSchema: Schema<ICar> = new Schema({
    company: {type: String},
    color: {type: String},
    year: {type: Number},
    price: {type: Number},
});

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;