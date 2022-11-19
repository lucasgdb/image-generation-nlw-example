/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import { useState } from "react";
import { useDebouncedCallback, useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ImageWithLoader from "./components/ImageWithLoader";
import Input from "./components/Input";

export default function Page() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cardType, setCardType] = useState("explorer");

  const [debouncedImageUrl] = useDebounce(imageUrl, 500);

  const handleChangeImageUrl = (value: string) => setImageUrl(value);

  const handleChangeUsername = useDebouncedCallback(
    (value: string) => setUsername(value),
    750
  );

  const handleChangeLastname = useDebouncedCallback(
    (value: string) => setLastname(value),
    750
  );

  const handleChangeCardType = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "explorer" && event.target.checked) {
      setCardType("explorer");
      return;
    }

    if (event.target.id === "ignite" && event.target.checked) {
      setCardType("ignite");
    }
  };

  const onCopy = () => toast("Copiado com sucesso!", { type: "success" });

  const cardUrl = `${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}${
    username ? `&username=${username}` : ""
  }${lastname ? `&lastname=${lastname}` : ""}&cardType=${cardType}`;

  return (
    <>
      <Head>
        <title>OG Image Generation</title>
      </Head>

      <div className="flex flex-col gap-4 mt-4 px-4">
        <main className="flex gap-4 flex-wrap justify-center w-full">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Input
              type="url"
              placeholder="URL da imagem"
              defaultValue={debouncedImageUrl}
              onChange={(event) => handleChangeImageUrl(event.target.value)}
              className={!imageUrl ? "border-[#f44336]" : ""}
            />

            <Input
              type="text"
              placeholder="Nome"
              defaultValue={username}
              onChange={(event) => handleChangeUsername(event.target.value)}
              disabled={!imageUrl}
            />

            <Input
              type="text"
              placeholder="Sobrenome"
              defaultValue={lastname}
              onChange={(event) => handleChangeLastname(event.target.value)}
              disabled={!imageUrl}
            />

            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="cardType"
                  id="explorer"
                  checked={cardType === "explorer"}
                  onChange={handleChangeCardType}
                  disabled={!imageUrl}
                />

                <label
                  htmlFor="explorer"
                  className={`select-none ${!imageUrl && "opacity-30"}`}
                >
                  Explorer
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="cardType"
                  id="ignite"
                  checked={cardType === "ignite"}
                  onChange={handleChangeCardType}
                  disabled={!imageUrl}
                />

                <label
                  htmlFor="ignite"
                  className={`select-none ${!imageUrl && "opacity-30"}`}
                >
                  Ignite
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center border rounded-xl w-[264px] h-[419px] min-w-[264px]">
            {debouncedImageUrl ? (
              <ImageWithLoader
                src={`${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${debouncedImageUrl}&username=${username}&lastname=${lastname}&cardType=${cardType}`}
                alt="card"
                width={264}
                height={419}
                download
              />
            ) : (
              <p className="text-center text-gray-600">Aguardando URL...</p>
            )}
          </div>
        </main>

        <hr className="divide-y" />

        <div className="flex">
          <CopyToClipboard onCopy={onCopy} text={cardUrl}>
            <button
              className="bg-[#4C55D2] px-4 py-2 rounded text-white shadow disabled:opacity-30"
              disabled={!imageUrl}
            >
              Copiar URL do Card
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
}
