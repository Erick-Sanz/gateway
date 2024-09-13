import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class PaginationDto {
  @Min(0)
  @Type(() => Number)
  skip: number;
  @Min(0)
  @Type(() => Number)
  limit: number;
}
