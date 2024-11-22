import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { request } from 'express';

import { RoleEnum } from '../../database/entities/enums/role-enum';
import { CurrentUser } from './decorators/current-user-decorator';
import { Roles } from './decorators/role-decorator';
import { RolesGuard } from './guards/roles-guard';
import { SignUpDtoReq } from './models/try-model';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles([RoleEnum.ADMIN, RoleEnum.BUYER, RoleEnum.SELLER])
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpDtoReq): Promise<void> {
    console.log(dto); // зареєстровуватись можуть всі , окрім manager(його створює admin)
  }
  @Post('sign-in')
  public async signIn(@Body() dto: any) {}
  @Post('sign-out') //  ми хочемо робити sigh-out тільки коли ми авторизовані
  public async signOut(@CurrentUser() userData: any): Promise<void> {}
  @Post('refresh') // видалення наших tokens  і створення нової пари tokens
  public async refresh(@CurrentUser() userData: any) {}
}
