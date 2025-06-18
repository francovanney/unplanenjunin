import { useInfiniteQuery } from "@tanstack/react-query";

import { SHOWS_INFINITE_KEY } from "../consts/queryKeys";
import { API_SHOWS_URL } from "../consts/apiUrls";
import { fetchGet } from "../../utils/fetch";
import type { IShowItem } from "./interfaces/IShow";

interface ShowsResponse {
  data: IShowItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function useShowsInfiniteQuery(pageSize = 15) {
  return useInfiniteQuery<ShowsResponse>({
    queryKey: [SHOWS_INFINITE_KEY],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchGet(
        `${API_SHOWS_URL}?page=${pageParam}&limit=${pageSize}`
      );
      return response as ShowsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ShowsResponse) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
