import { GeoRegion } from './geo-region';

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  lastUpdatedAt: string;
  regions: GeoRegion[];
  devicesNumber: number;
  eventsNumber: number;
}
