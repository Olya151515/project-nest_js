export class BaseAdsResDto {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  status: string;
  images: string[] | null;
}
