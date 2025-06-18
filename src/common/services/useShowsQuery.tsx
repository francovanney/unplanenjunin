import { useQuery } from "@tanstack/react-query";

import { SHOWS_KEY } from "../consts/queryKeys";
import { API_SHOWS_URL } from "../consts/apiUrls";
import { fetchGet } from "../../utils/fetch";
import type { IShow } from "./interfaces/IShow";

export default function useShowsQuery() {
  return useQuery<IShow>({
    queryKey: [SHOWS_KEY],
    queryFn: async () => fetchGet(API_SHOWS_URL),
  });
}
