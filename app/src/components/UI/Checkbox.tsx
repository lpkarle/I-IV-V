import { BaseSyntheticEvent } from "react";

type CheckboxProps = {
  id: string;
  title: string;
  checked?: boolean;
  onChange?: (e: BaseSyntheticEvent) => void;
};

export default function Checkbox({
  id,
  title,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <>
      <label htmlFor={id} className="fieldset-label">
        <input
          id={id}
          type="checkbox"
          value={title}
          defaultChecked={checked ?? false}
          className="checkbox"
          onChange={onChange}
        />
        {title}
      </label>
    </>
  );
}
