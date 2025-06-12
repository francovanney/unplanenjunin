import Card from "../common/components/card/Card";
import useShowsQuery from "../common/services/useShowsQuery";

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
          {showsQuery.data?.map((show) => (
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
