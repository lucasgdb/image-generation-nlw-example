/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useMounted } from "../../../../hooks/useMounted";

declare global {
  interface Window {
    WebKitMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
    MozMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
  }
}

export default function ImageWithLoader(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState(false);
  const mounted = useMounted();

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const handleChangeAvatar = () => setHidden(true);

    const observer = new MutationObserver(handleChangeAvatar);

    observer.observe(imgRef.current!, {
      attributes: true,
      attributeFilter: ["src"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  const handleLoad = () => {
    setHidden(false);
    setError(false);
  };

  const handleError = () => setError(true);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center">Imagem inválida!</p>
      ) : (
        hidden && <p className="text-gray-900 text-center">Carregando...</p>
      )}

      <img
        onLoad={handleLoad}
        onError={handleError}
        hidden={hidden}
        ref={imgRef}
        width={264}
        height={419}
        alt="card"
        {...props}
      />
    </>
  );
}
