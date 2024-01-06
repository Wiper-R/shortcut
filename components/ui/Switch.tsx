"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type SwitchProps = {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  onChange?: (v: boolean) => void;
  onBlur?: (...e: any) => void;
};

const Switch = ({
  value = "on",
  checked: _p_checked,
  defaultChecked,
  onChange = (v: boolean) => {},
  ...props
}: SwitchProps) => {
  const [checked = _p_checked || false, setChecked] = useState(defaultChecked);
  const prevState = useRef(defaultChecked);

  useEffect(() => {
    if (checked != prevState.current) {
      onChange(checked);
    }
  }, [_p_checked, defaultChecked, onChange, checked]);
  return (
    <button
      value={value}
      onClick={() => setChecked((v) => !v)}
      aria-checked={checked}
      {...props}
      type="button"
      className={cn(
        "flex items-center justify-center after:rounded-full w-10 h-6 rounded-full bg-gray-500  after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white relative after:-translate-x-2 after:transition-transform",
        { "after:translate-x-2 bg-black": checked }
      )}
    />
  );
};

export { Switch };
