import { ShortBrandResDto } from './short-brand.res.dto';

export class ModelResDto {
  id: string;
  name: string;
  year: number;
  brand: ShortBrandResDto;
}
