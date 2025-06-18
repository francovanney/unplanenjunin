import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import type { IShowItem } from "../services/interfaces/IShow";

interface CardProps {
  show: IShowItem;
}

const Card = ({ show }: CardProps) => {
  const formattedDate = show.event_date
    ? format(parseISO(show.event_date), "dd 'de' MMMM 'de' yyyy", {
        locale: es,
      })
    : null;

  const imageUrl = `data:image/${show.flyer.type};base64,${btoa(
    new Uint8Array(show.flyer.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  )}`;

  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          alt={`Flyer de ${show.title}`}
          src={imageUrl}
          className="w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[0.8/1]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs flex-wrap">
          {formattedDate && (
            <time dateTime={show.event_date || ""} className="text-gray-500">
              {formattedDate}
            </time>
          )}
          {show.categories?.slice(0, 3).map((category, index) => (
            <p
              key={`category-${index}`}
              className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
          ))}
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <p>
              <span className="absolute inset-0" />
              {show.title}
            </p>
          </h3>
          {show.venue ? (
            <p className="mt-5 line-clamp-3 text-sm/6 flex gap-2 text-gray-600">
              <MapPinIcon width={20} />
              {`${show.venue}${show.city ? `, ${show.city}` : ""}`}
            </p>
          ) : (
            <p className="mt-5 line-clamp-3 text-sm/6 flex gap-2 h-5 text-gray-600"></p>
          )}
        </div>
        <div className="mb-6 mt-6 flex items-center gap-x-4">
          <Button text="Comprar" url={show.url} />
        </div>
      </div>
    </article>
  );
};

export default Card;
