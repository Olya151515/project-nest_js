import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user-decorator';
import { SkipAuth } from './decorators/skip-auth-decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh-guard';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { SignUpBuyerReqDto } from './models/dto/req/sign-up-buyer.req.dto';
import { SignUpSellerReqDto } from './models/dto/req/sign-up-seller.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { ITokenPair } from './models/interfaces/token-pair.interface';
import { IUserData } from './models/interfaces/user-data';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post('sign-up-admin')
  public async signUpAdmin(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUpAdmin(dto);
  }
  @SkipAuth()
  @Post('sign-up-seller')
  public async signUpSeller(
    @Body() dto: SignUpSellerReqDto,
  ): Promise<AuthResDto> {
    return await this.authService.signUpSeller(dto);
  }
  @SkipAuth()
  @Post('sign-up-buyer')
  public async signUpBuyer(
    @Body() dto: SignUpBuyerReqDto,
  ): Promise<AuthResDto> {
    return await this.authService.signUpBuyer(dto);
  }

  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }
  @ApiBearerAuth()
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<ITokenPair> {
    return await this.authService.refresh(userData);
  }
}
