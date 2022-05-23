
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    files: [
        {
            sfieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size:  Number

        }
    ]


}

export const MovieSchema = SchemaFactory.createForClass(Movie);