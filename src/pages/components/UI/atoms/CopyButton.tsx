import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

interface Props {
  text: string;
  disabled?: boolean;
}

export default function CopyButton({ text, disabled }: Props) {
  const onCopy = () => toast("Copiado com sucesso!", { type: "success" });

  return (
    <CopyToClipboard onCopy={onCopy} text={text}>
      <button
        className="bg-[#4C55D2] px-4 py-2 rounded text-white shadow disabled:opacity-30"
        disabled={disabled}
      >
        Copiar URL do Card
      </button>
    </CopyToClipboard>
  );
}
