import { RoleEnum } from '../../../database/entities/enums/role-enum';

export const getRepository = (role: string): string => {
  switch (role) {
    case RoleEnum.ADMIN:
      return 'adminRepository';
    case RoleEnum.BUYER:
      return 'buyerRepository';
    case RoleEnum.MANAGER:
      return 'managerRepository';
    case RoleEnum.SELLER:
      return 'sellerRepository';
    default:
      return '';
  }
};
