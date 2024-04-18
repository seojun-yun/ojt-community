// import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

// @Injectable()
// export class ParseIntPipe implements PipeTransform<string> {
//     async transform(value: string, metadata: ArgumentMetadata) {
//         const intValue = parseInt(value, 10);

//         if (isNaN(intValue)) {
//             throw new BadRequestException('validation failed');
//         }

//         return intValue;
//     }
// }