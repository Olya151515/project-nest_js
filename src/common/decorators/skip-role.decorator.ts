import { SetMetadata } from '@nestjs/common';

export const SKIP_ROLE = 'SKIP_ROLE';
export const SkipRole = () => SetMetadata(SKIP_ROLE, true);
