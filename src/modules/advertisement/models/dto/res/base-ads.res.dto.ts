import { BaseSellerResDto } from '../../../../seller(user)/models/dto/res/base-seller.res.dto';

export class BaseAdsResDto {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  brand: string;
  model: string;
  status: string;
  images: string[] | null;
  seller: BaseSellerResDto;
  soldAt: Date | null;
}
