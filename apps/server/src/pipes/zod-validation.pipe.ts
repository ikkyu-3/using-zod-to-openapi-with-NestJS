import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log('ZodValidationPipe: ', value, typeof value, metadata);
    try {
      this.schema.parse(value);
      console.log(this.schema.parse(value));
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
