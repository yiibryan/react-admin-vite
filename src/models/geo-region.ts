export type GeoRegion =
  | {
      type: 'circle';
      center: {
        lng: number;
        lat: number;
      };
      radius: number;
    }
  | {
      type: 'polygon';
      vertices: { lng: number; lat: number }[];
    };
