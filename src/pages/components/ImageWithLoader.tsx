/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

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

interface ImageWithLoader extends React.ImgHTMLAttributes<HTMLImageElement> {
  download?: boolean;
}

export default function ImageWithLoader({
  download,
  ...props
}: ImageWithLoader) {
  const [hidden, setHidden] = useState(true);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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
  }, []);

  const handleLoad = () => setHidden(false);

  return (
    <>
      {hidden && <p className="text-gray-900 text-center">Carregando...</p>}
      {download ? (
        <a href={props.src} title="Baixar imagem" download="Card">
          <img
            onLoad={handleLoad}
            hidden={hidden}
            ref={imgRef}
            alt="image"
            {...props}
          />
        </a>
      ) : (
        <img
          onLoad={handleLoad}
          hidden={hidden}
          ref={imgRef}
          alt="image"
          {...props}
        />
      )}
    </>
  );
}
