import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user-decorator';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { SignUpSellerReqDto } from './models/dto/req/sign-up-seller.req.dto';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up-admin')
  public async signUpAdmin(@Body() dto: SignUpReqDto): Promise<void> {
    await this.authService.signUpAdmin(dto);
    console.log(dto); // зареєстровуватись можуть всі , окрім manager(його створює admin)
  }
  @Post('sign-up-seller')
  public async signUpSeller(@Body() dto: SignUpSellerReqDto): Promise<void> {
    await this.authService.signUpSeller(dto);
    console.log(dto); // зареєстровуватись можуть всі , окрім manager(його створює admin)
  }
  @Post('sign-up-buyer')
  public async signUpBuyer(@Body() dto: SignUpReqDto): Promise<void> {
    console.log(dto); // зареєстровуватись можуть всі , окрім manager(його створює admin)
  }
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto) {
    console.log(dto);
  }
  @ApiBearerAuth()
  @Post('sign-out') //  ми хочемо робити sigh-out тільки коли ми авторизовані
  public async signOut(@CurrentUser() userData: any): Promise<void> {}
  @ApiBearerAuth()
  @Post('refresh') // видалення наших tokens  і створення нової пари tokens
  public async refresh(@CurrentUser() userData: any) {}
}
