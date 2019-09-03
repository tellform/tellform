import { IsMongoId } from 'class-validator';

export class FindOneDto {
  @IsMongoId()
  id: string;
}
