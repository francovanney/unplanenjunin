import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

import Card from "../common/components/Card";
import FilterCategories from "../common/components/FilterCategories";

import useShowsInfiniteQuery from "../common/services/useShowsInfiniteQuery";
import type { IShowItem } from "../common/services/interfaces/IShow";

const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col items-start justify-between rounded-2xl bg-gray-100 p-4 h-[600px]">
    <div className="w-full h-96 bg-gray-300 rounded-2xl mb-6" />
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="h-10 bg-gray-300 rounded w-1/2" />
  </div>
);

export default function GlobalLayout() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useShowsInfiniteQuery();

  const allShows: IShowItem[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const categories = useMemo(() => {
    if (!allShows.length) return [];
    const set = new Set<string>();
    allShows.forEach((show) => {
      show.categories?.forEach((cat: string) => set.add(cat));
    });
    return Array.from(set);
  }, [allShows]);

  const filteredShows = useMemo(() => {
    if (!selectedCategory) return allShows;
    return allShows.filter((show) =>
      show.categories?.includes(selectedCategory)
    );
  }, [allShows, selectedCategory]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastShowElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500;
      setShowScrollToTop(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-6xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Un Plan En Junín
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Conocé los eventos, shows y actividades que no te podés perder.
          </p>
        </div>
        <hr className="my-10 border-gray-200" />

        <FilterCategories
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          isLoading={isLoading}
        />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredShows?.map((show, index) => {
                if (index === filteredShows.length - 1) {
                  return (
                    <div key={show.show_id} ref={lastShowElementRef}>
                      <Card show={show} />
                    </div>
                  );
                }
                return <Card show={show} key={show.show_id} />;
              })}
        </div>

        {isFetchingNextPage && (
          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-3 gap-x-8 gap-y-16 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-white rounded-full shadow-lg p-2 transition-opacity hover:bg-gray-100"
          aria-label="Scroll to top"
        >
          <ArrowUpCircleIcon
            width={50}
            className="text-red-500 cursor-pointer"
          />
        </button>
      )}
    </div>
  );
}
