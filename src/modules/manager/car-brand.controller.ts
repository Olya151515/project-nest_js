import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BrandReqDto } from './models/dto/req/brand/brand.req.dto';
import { BrandResDto } from './models/dto/res/brand/brand.res.dto';
import { CarBrandService } from './services/car-brand.service';

@ApiBearerAuth()
@ApiTags('brands')
@Controller('brands')
export class CarBrandController {
  constructor(private readonly brandService: CarBrandService) {}
  @Post('brand')
  public async crateBrand(@Body() dto: BrandReqDto): Promise<BrandResDto> {
    return await this.brandService.createBrand(dto);
  }

  @Get('brand')
  public async getBrand(): Promise<BrandResDto[]> {
    return await this.brandService.getAllBrands();
  }

  @Delete(':brandId')
  public async deleteBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ): Promise<void> {
    return await this.brandService.deleteBrand(brandId);
  }
}
