import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  sfieldname: String;
  @Prop()
  originalname: String;
  @Prop()
  encoding: String;
  @Prop()
  mimetype: String;
  @Prop()
  destination: String;
  @Prop()
  filename: String;
  @Prop()
  path: String;
  @Prop()
  size: Number;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
