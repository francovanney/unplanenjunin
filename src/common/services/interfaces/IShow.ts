export interface IShowItem {
  adress: string;
  categories: string[];
  city: string;
  completeevent: boolean | null;
  end_date: Date;
  event_date: string | null;
  flyer: {
    type: string;
    data: number[];
  };
  instagram: string | null;
  show_id: number;
  start_date: string | null;
  title: string;
  url: string;
  venue: string;
  web: string | null;
}

export interface IShow {
  data: IShowItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
