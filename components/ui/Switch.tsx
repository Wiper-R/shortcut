"use client";

import { cs } from "@/lib";
import React, { useEffect, useId, useRef } from "react";

import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type SwitchProps<T extends FieldValues> = {
  id?: string;
  readOnly?: boolean
} & UseControllerProps<T>;

const Switch = <T extends FieldValues>(props: SwitchProps<T>) => {
  const id = props.id || useId();
  const { field } = useController(props);
  const labelRef = useRef<HTMLLabelElement>(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.target !== e.currentTarget) return;
    switch (e.code) {
      case "Enter":
      case "Space":
        labelRef.current?.click();
        break;
    }
  }

  useEffect(() => {
    labelRef.current?.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <label
      className={cs(
        "relative flex h-6 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary-light/60 transition-colors delay-75 focus:outline-ascent",
        field.value && "bg-secondary",
      )}
      htmlFor={id}
      tabIndex={0}
      ref={labelRef}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden"
        {...field}
        checked={field.value}
        readOnly={props.readOnly}
      />
      <span
        className={cs(
          "h-4 w-4 flex-shrink-0 -translate-x-3 rounded-full bg-white transition-transform delay-75",
          field.value && "translate-x-3",
        )}
      />
    </label>
  );
};

export default Switch;
