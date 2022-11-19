/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import ImageWithLoader from "./components/ImageWithLoader";
import Input from "./components/Input";

export default function Page() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cardType, setCardType] = useState("explorer");

  const handleChangeImageUrl = useDebouncedCallback(
    (value: string) => setImageUrl(value),
    500
  );

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

  return (
    <>
      <Head>
        <title>OG Image Generation</title>
      </Head>

      <div className="flex flex-col items-center gap-4 mt-4 px-4">
        <main className="flex gap-4 flex-wrap justify-center">
          <div className="flex flex-col gap-2">
            <Input
              type="url"
              placeholder="URL da imagem"
              defaultValue={imageUrl}
              onChange={(event) => handleChangeImageUrl(event.target.value)}
            />

            <Input
              type="text"
              placeholder="Nome"
              defaultValue={username}
              onChange={(event) => handleChangeUsername(event.target.value)}
            />

            <Input
              type="text"
              placeholder="Sobrenome"
              defaultValue={lastname}
              onChange={(event) => handleChangeLastname(event.target.value)}
            />

            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="cardType"
                  id="explorer"
                  checked={cardType === "explorer"}
                  onChange={handleChangeCardType}
                />

                <label htmlFor="explorer" className="select-none">
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
                />

                <label htmlFor="ignite" className="select-none">
                  Ignite
                </label>
              </div>
            </div>
          </div>

          <div className="w-[264px] h-[419px]">
            {imageUrl ? (
              <ImageWithLoader
                src={`${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}&username=${username}&lastname=${lastname}&cardType=${cardType}`}
                alt="card"
                width={264}
                height={419}
                download
              />
            ) : (
              <p className="text-center text-gray-900">Aguardando...</p>
            )}
          </div>
        </main>

        {imageUrl && (
          <p className="text-gray-500 break-all">
            URL do card:
            <br />
            {`${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}${
              username ? `&username=${username}` : ""
            }${lastname ? `&lastname=${lastname}` : ""}&cardType=${cardType}`}
          </p>
        )}
      </div>
    </>
  );
}
