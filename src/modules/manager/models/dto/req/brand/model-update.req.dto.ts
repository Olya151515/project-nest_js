import { PickType } from '@nestjs/swagger';

import { ModelReqDto } from './model.req.dto';

export class ModelUpdateReqDto extends PickType(ModelReqDto, ['year']) {}
