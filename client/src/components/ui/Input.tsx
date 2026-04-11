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
        <>
          <input
            type={type ? type : "text"}
            {...register(name)}
            placeholder={placeholder}
            onKeyDown={
              eventHandle
                ? (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      eventHandle?.();
                    }
                  }
                : undefined
            }
          ></input>
          <div className="flex mt-2 gap-2">
            <div className="text-xs px-2 py-1 rounded-full bg-green-300/10">
              Email@gmail.com x
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-green-300/10">
              Email@gmail.com{" "}
            </div>
          </div>
        </>
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
