import { useState } from "react";

import { Field, Input, Label, Tab, TabGroup, TabList } from "@headlessui/react";

import { XCircleIcon } from "@heroicons/react/24/outline";

interface FilterCategoriesProps {
  categories: string[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
  isLoading?: boolean;
}

const SkeletonTab = () => (
  <div className="animate-pulse bg-gray-200 rounded-full px-6 py-2 h-[36px] w-24"></div>
);

export default function FilterCategories({
  categories,
  selected,
  onSelect,
  isLoading,
}: FilterCategoriesProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <div className="flex w-full justify-center px-4 pt-2 mb-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Field className="relative">
            <Label className="text-lg/8 font-semibold text-gray-900">
              Buscar evento
            </Label>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              className="mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 pl-3 pr-10 text-sm/6 text-gray-700 focus:outline-none focus:ring-1 focus:ring-inset"
            />
            {inputValue && (
              <XCircleIcon
                width={20}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 mt-[21px] cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={clearInput}
              />
            )}
          </Field>
        </div>
        <TabGroup>
          <TabList className="flex flex-wrap gap-4 justify-center">
            {isLoading ? (
              <>
                <SkeletonTab />
                <SkeletonTab />
                <SkeletonTab />
                <SkeletonTab />
                <SkeletonTab />
              </>
            ) : (
              <>
                <Tab
                  key="todas"
                  className={`cursor-pointer rounded-full px-6 py-2 text-sm/6 font-semibold text-gray-700 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 ${
                    selected === null
                      ? "data-selected:bg-black/10 bg-black/10"
                      : ""
                  }`}
                  onClick={() => onSelect(null)}
                >
                  Todas
                </Tab>
                {categories.map((name) => (
                  <Tab
                    key={name}
                    className={`cursor-pointer rounded-full px-6 py-2 text-sm/6 font-semibold text-gray-700 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 ${
                      selected === name
                        ? "data-selected:bg-black/10 bg-black/10"
                        : ""
                    }`}
                    onClick={() => onSelect(name)}
                  >
                    {name}
                  </Tab>
                ))}
              </>
            )}
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}
