import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const generateRandomNumList = (max: number): number[] => {
  const generateRandomNumbers = () => {
    return Math.floor(Math.random() * max);
  };
  const arr: number[] = [];
  while (arr.length < max) {
    const number = generateRandomNumbers();
    if (!arr.includes(number)) {
      arr.push(number);
    }
  }
  return arr;
};

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const toValidate = (metatype: any): boolean => {
      const types: any[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    };

    if (!metatype || !toValidate(metatype)) return value;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      const errorValues = errors.map((err) => {
        if (err.constraints) {
          const [message] = Object.values(err.constraints);
          const fieldName = err.property;
          return { fieldName, message };
        }
        return { fieldName: err.property, message: 'invalid inputs', errors };
      });
      const error = {
        status: false,
        message: 'incorrect input',
        data: errorValues,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
