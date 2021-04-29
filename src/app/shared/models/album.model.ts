import { Picture } from "./picture.model";

export interface Album {
    name: string;
    pictures: Picture[];
    _id: string;
}