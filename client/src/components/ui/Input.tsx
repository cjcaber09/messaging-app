// components/Input.tsx
import type {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  type?: string;
  eventHandle?: () => void;
};

export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  errors,
  placeholder,
  type,
  eventHandle,
}: InputProps<T>) => {
  return (
    <>
      <label className="text-sm text-gray-300">{label}</label>
      {type !== "textarea" ? (
        <input
          type={type ? type : "text"}
          {...register(name)}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              eventHandle?.();
            }
          }}
        ></textarea>
      )}
      {errors[name] && (
        <p className="text-xs text-red-900">
          {errors[name]?.message as string}
        </p>
      )}
    </>
  );
};
