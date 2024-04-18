import { DBService } from "./database.service";

export class DB<T> extends DBService<T> {
    constructor(fileName: string) {
        super();
        this.datas = super.loadAll(fileName);
    }

    private readonly datas: T[];

    findAll(): T[] {
        const cloned: T[] = Object.assign([], this.datas); //deep copy
        return cloned;
    }

    getSize(): number {
        return this.datas.length;
    }

    insert(data: T) {
        this.datas.push(data);
        this.saveAll(this.datas);
    }

    findOne(expression: (value: T, index: number, obj: T[]) => boolean): T {
        return this.datas.find(expression);
    }

    filter(expression: (value: T, index: number, obj: T[]) => boolean): T[] {
        return this.datas.filter(expression);
    }

    update(data: T, expression: (value: T, index: number, obj: T[]) => boolean){
        const source = this.findOne(expression);

        const idx = this.datas.indexOf(source);

        this.datas[idx] = data;
        
        this.saveAll(this.datas);
    }

    delete(expression: (value: T, index: number, obj: T[]) => boolean) {
        const obj = this.findOne(expression);

        const idx = this.datas.indexOf(obj);
        this.datas.splice(idx, 1);

        this.saveAll(this.datas);
    }
}