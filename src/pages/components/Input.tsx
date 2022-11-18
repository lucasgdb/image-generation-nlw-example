import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input {...props} className="px-4 py-2 text-gray-900 border rounded" />;
}
