import { Injectable } from "@nestjs/common";
import { Repository } from "src/database/repository";
import { Category } from "./category.entity";

@Injectable()
export class CategoryDB extends Repository<Category> {
    constructor() {
        super("categories");
    }

    findCategoriesWithParentId(id: number) {
        return this.filter(c => c.parentId === id)
    }
}