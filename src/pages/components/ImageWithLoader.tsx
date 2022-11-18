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

export default function ImageWithLoader(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
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
      <img
        onLoad={handleLoad}
        hidden={hidden}
        ref={imgRef}
        alt="image"
        {...props}
      />
    </>
  );
}
