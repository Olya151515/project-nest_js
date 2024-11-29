import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BrandReqDto } from './models/dto/req/brand/brand.req.dto';
import { UpdateBrandReqDto } from './models/dto/req/brand/update.brand.req.dto';
import { BrandResDto } from './models/dto/res/brand/brand.res.dto';
import { BrandMapper } from './services/brand.mapper';
import { CarBrandService } from './services/car-brand.service';

@ApiBearerAuth()
@ApiTags('brands')
@Controller('brands')
export class CarBrandController {
  constructor(private readonly brandService: CarBrandService) {}
  @Get('brand')
  public async getBrand(): Promise<BrandResDto[]> {
    return await this.brandService.getAllBrands();
  }

  @Post('brand')
  public async crateBrand(@Body() dto: BrandReqDto): Promise<BrandResDto> {
    const result = await this.brandService.createBrand(dto);
    return BrandMapper.toBrandResDto(result);
  }

  @Patch(':brandId')
  public async updateBrand(
    @Param('brandId') brandId: string,
    @Body() dto: UpdateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.updateBrand(brandId, dto);
  }
  @Delete(':brandId')
  public async deleteBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ): Promise<void> {
    return await this.brandService.deleteBrand(brandId);
  }
}
