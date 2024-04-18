import { Injectable } from "@nestjs/common";
import { DB } from "src/database/db";
import { Category } from "./category.entity";

@Injectable()
export class CategoryDB extends DB<Category> {
    constructor() {
        super("categories");
    }

}