export interface GetGovern {
  id: number;
  name: string;
  status: boolean;
  cities: { id: number; name: string }[];
}
