import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class DBService<T> {
    constructor() {}

    private dataPath: string;

    loadAll(fileName: string) {
        if (!this.dataPath) {
            this.dataPath = path.resolve('datas', `${fileName}.json`);
        }

        if (!existsSync(this.dataPath)) {
            if (!existsSync(path.resolve('datas'))) mkdirSync(path.resolve('datas'));
            writeFileSync(this.dataPath, '[]');
        }

        return JSON.parse(readFileSync(this.dataPath, 'utf8'));
    }

    saveAll(datas: T[]) {
        writeFileSync(this.dataPath, JSON.stringify(datas, null, 2));
    }
    
}
