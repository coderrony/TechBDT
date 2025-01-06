
export type DivisionType = {
  id: string;
  name: string;
  bn_name?: string;
  url?: string;
};

export type DistrictType = {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url?: string;
};

export type UpzilaType = {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url?: string;
};

export type UnionType = {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url?: string;
};
