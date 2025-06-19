export interface IShowItem {
  address: string;
  categories: string[];
  city: string;
  completeevent: boolean | null;
  end_date: string | null;
  event_date: string | null;
  image_url: string;
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
