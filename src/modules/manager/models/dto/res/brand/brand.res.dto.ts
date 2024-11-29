import { ShortModelResDto } from './short-model.res.dto';

export class BrandResDto {
  id: string;
  name: string;
  models: ShortModelResDto[];
}
