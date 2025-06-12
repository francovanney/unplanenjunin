import { useQuery } from "@tanstack/react-query";

import { SHOWS_KEY } from "../consts/queryKeys";
import { API_SHOWS_URL } from "../consts/apiUrls";
import { fetchGet } from "../../utils/fetch";

interface IShow {
  show_id: number;
  title: string;
  venue: string;
  event_date: string;
  categories: string[];
  city: string;
  completeevent: boolean | null;
  end_date: string | null;
  flyer: {
    type: string;
    data: number[];
  };
  start_date: string | null;
  url: string;
}

export default function useShowsQuery() {
  return useQuery<IShow[]>({
    queryKey: [SHOWS_KEY],
    queryFn: async () => fetchGet(API_SHOWS_URL),
  });
}
