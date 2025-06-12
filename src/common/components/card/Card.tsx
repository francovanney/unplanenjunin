import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface CardProps {
  title: string;
  date: string;
  image: number[];
  key: string;
  categories?: string[];
}

const Card = ({ title, date, image, key, categories }: CardProps) => {
  return (
    <article key={key} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          alt=""
          src={`data:image/jpg;base64,${btoa(
            new Uint8Array(image).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`}
          className="w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[0/1]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={date} className="text-gray-500">
            {format(parseISO(date), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </time>
          <a
            href={"#"}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {categories}
          </a>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a href={"#"}>
              <span className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">"lala"</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
