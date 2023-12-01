"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import inputVariants from "./ui/input";
import buttonVariants from "./ui/button";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import ReactModal from "react-modal";
import { cs } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LinksFilterSchema = z.object({
  linkType: z.enum(["withCustomBackHalf", "withoutCustomBackHalf", "all"]),
  tags: z.array(z.string()),
});



type LinksFilterType = z.infer<typeof LinksFilterSchema>;

const options = [
  { value: "car", label: "Car" },
  { value: "bike", label: "Bike" },
  { value: "plane", label: "Air Plane" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "boat", label: "Boat" },
  { value: "subway", label: "Subway" },
  { value: "helicopter", label: "Helicopter" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "scooter", label: "Scooter" },
  { value: "yacht", label: "Yacht" },
  { value: "sailboat", label: "Sailboat" },
  { value: "rocket", label: "Rocket" },
  { value: "skateboard", label: "Skateboard" },
  { value: "hovercraft", label: "Hovercraft" },
  { value: "jet ski", label: "Jet Ski" },
  { value: "hot air balloon", label: "Hot Air Balloon" },
  { value: "ferry", label: "Ferry" },
  { value: "trolley", label: "Trolley" },
  { value: "gondola", label: "Gondola" },
  // Add more options here
];

function LinkToolbar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { register, control } = useForm<LinksFilterType>({
    resolver: zodResolver(LinksFilterSchema),
  });
  const handleCloseModal = () => setIsFilterOpen(false);

  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="relative flex justify-between gap-x-2 pb-4 sm:pb-10">
      <button
        className={buttonVariants({
          type: "ghost",
          className: cs("gap-x-2", isSearchOpen && "max-sm:hidden"),
        })}
        onClick={() => setIsFilterOpen(true)}
      >
        <FilterIcon />
        Filters
      </button>
      <input
        className={inputVariants({
          className: cs(
            "flex-grow sm:max-w-xs",
            !isSearchOpen && "max-sm:hidden",
          ),
        })}
        placeholder="Search for link"
        onBlur={() => setIsSearchOpen(false)}
        ref={searchInput}
        type="search"
        name="search"
        defaultValue={searchParams.get("search") || ""}
        onInput={(e) => {
          e.preventDefault();
          const params = new URLSearchParams(searchParams);
          const search = e.currentTarget.value;
          if (search) params.set("search", search);
          else params.delete("search");
          router.push(pathname + "?" + params.toString());
        }}
      />
      <button
        className={buttonVariants({
          type: "ghost",
          size: "sm",
          className: "sm:hidden",
        })}
        onClick={() => setIsSearchOpen((v) => !v)}
      >
        {isSearchOpen ? (
          <XIcon strokeWidth={2} />
        ) : (
          <SearchIcon strokeWidth={2} />
        )}
      </button>
      <ReactModal
        isOpen={isFilterOpen}
        onRequestClose={handleCloseModal}
        parentSelector={() => document.querySelector("#modals")!}
        preventScroll
      >
        <button className="absolute right-4" onClick={handleCloseModal}>
          <XIcon />
        </button>
        <form className="flex flex-col">
          <h4 className="text-xl font-bold">Filters</h4>

          <div className="flex flex-col gap-5 py-4">
            <div className="space-y-1">
              <label htmlFor="" className="text-sm font-medium text-secondary">
                Tags
              </label>
              <Controller
                name="linkType"
                control={control}
                defaultValue={"all"}
                render={({ field: { onChange, value } }) => (
                  <Select
                    {...register("linkType")}
                    maxMenuHeight={160}
                    options={options}
                    onChange={onChange}
                    value={options.find((option) => option.value === value)}
                    menuPortalTarget={document.getElementById("modals")}
                    isMulti
                  />
                )}
              />
            </div>
            <button className={buttonVariants({})}>Apply</button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}

export default LinkToolbar;
