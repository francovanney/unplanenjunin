import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaInstagram } from "react-icons/fa";
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

  return (
    <article className="flex flex-col items-start">
      <LazyLoadImage
        alt={`Flyer de ${show.title}`}
        src={show.image_url}
        className="w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[0.8/1]"
        effect="blur"
      />

      <div className="max-w-xl w-full">
        <div className="mt-6 flex items-center gap-x-4 text-xs flex-wrap">
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

        <div className="mt-3 flex items-center">
          <h3 className="text-lg font-semibold text-gray-900">{show.title}</h3>
          <div className="flex gap-5 ml-4">
            {show.instagram ? (
              <a
                href={`https://www.instagram.com/${show.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={25} className="text-pink-400" />
              </a>
            ) : (
              <FaInstagram size={25} className="opacity-0" />
            )}
            {show.web ? (
              <a href={show.web} target="_blank" rel="noopener noreferrer">
                <GlobeAltIcon width={25} className="text-blue-600" />
              </a>
            ) : (
              <GlobeAltIcon width={25} className="opacity-0" />
            )}
          </div>
        </div>

        {show.venue ? (
          <p className="mt-5 text-sm flex gap-2 text-gray-600">
            <MapPinIcon width={20} />
            {`${show.venue}${show.city ? `, ${show.city}` : ""}`}
          </p>
        ) : (
          <div className="mt-5 h-5" />
        )}

        <div className="mt-6 mb-6">
          {show.url ? (
            <Button text="Comprar" url={show.url} />
          ) : (
            <div className="opacity-0">
              <Button text="Comprar" url="#" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
