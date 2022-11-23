import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

export default function Radio({ label, ...props }: Props) {
  return (
    <div className="flex gap-2">
      <input type="radio" className={`cursor-pointer ${props.className ?? ''}`} {...props} />

      <label htmlFor={props.id} className="select-none cursor-pointer">
        {label}
      </label>
    </div>
  );
}
