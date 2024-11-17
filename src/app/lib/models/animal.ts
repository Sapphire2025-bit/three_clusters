import mongoose, {Model, Schema} from "mongoose";
import IAnimal from "@/app/types/animalsForSchema";

const AnimalSchema: Schema<IAnimal> = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    age: {type: Number},
});

const Animal: Model<IAnimal> = mongoose.models.Animal || mongoose.model<IAnimal>('Animal', AnimalSchema);

export default Animal;