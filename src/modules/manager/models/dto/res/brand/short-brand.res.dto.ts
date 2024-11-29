import { PickType } from '@nestjs/swagger';

import { BrandResDto } from './brand.res.dto';

export class ShortBrandResDto extends PickType(BrandResDto, ['id', 'name']) {}
