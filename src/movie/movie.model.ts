import * as mongoose from "mongoose";
 
export const MovieSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    image: { type: String, required: true },
});
export interface Movie extends mongoose.Document{
         id: string;
         description: string;
         image: string;
}