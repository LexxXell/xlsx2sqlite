import { MapTablePattern } from '../@types';

export const mapTablePattern: MapTablePattern = {
  name: { include: ['name', 'member', 'customer'], exclude: ['number', 'project', 'building', 'company'] },
  email: { include: ['mail'], exclude: [] },
  phone: {
    include: ['tel', 'number', 'phone'],
    exclude: ['plot', 'member', 'registration', 'del', 'p-', 'unit', 'toll', 'mob', 'company'],
  },
  mobile: { include: ['mob'], exclude: ['plot', 'member', 'registration', 'del', 'p-', 'unit', 'toll'] },
  location: {
    include: ['addr', 'city', 'region', 'country', 'state', 'district', 'location'],
    exclude: ['email', 'company'],
  },
};

export const indexHeader = 0;
