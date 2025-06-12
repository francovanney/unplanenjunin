import Card from "../common/components/card/Card";
import useShowsQuery from "../common/services/useShowsQuery";

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
  const showsQuery = useShowsQuery();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Un Plan En Junín
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Descubrí que hacer en Junín, Buenos Aires. Conocé los eventos, shows
            y actividades que no te podés perder
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {showsQuery.isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : showsQuery.data?.map((show) => (
                <Card
                  key={show.show_id.toString()}
                  title={show.title}
                  date={show.event_date}
                  image={show.flyer?.data}
                  categories={show.categories}
                  venue={show.venue}
                  url={show.url}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
