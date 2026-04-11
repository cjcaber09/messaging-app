import { useState, type KeyboardEvent } from "react";
import { useController, type Control } from "react-hook-form";

export default function TagInput({
  name,
  control,
  placeholder,
}: {
  name: string;
  control: Control;
  placeholder?: string;
}) {
  const [inputVal, setInputVal] = useState("");
  const { field } = useController({ name, control, defaultValue: [] as [] });

  const addTag = () => {
    const val = inputVal.trim().replace(/,$/, "");
    if (!val || field.value.includes(val)) return;
    if (!isValidEmail(val)) {
      setInputVal("");
      return;
    }
    field.onChange([...field.value, val]);
    setInputVal("");
  };

  const removeTag = (index: number) => {
    field.onChange(field.value.filter((_: string, i: number) => i !== index));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", ",", " "].includes(e.key)) {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputVal) {
      removeTag(field.value.length - 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 items-center border border-gray-600 rounded-md px-2.5 py-1.5 min-h-[44px] bg-white/20 border-white/20">
      {field.value.map((tag: string, i: number) => (
        <span
          key={i}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${
            isValidEmail(tag)
              ? "bg-blue-900 text-blue-200"
              : "bg-red-900 text-red-200"
          }`}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-blue-600 text-xs"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder={field.value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[140px] outline-none text-sm bg-transparent text-gray-100"
      />
    </div>
  );
}
