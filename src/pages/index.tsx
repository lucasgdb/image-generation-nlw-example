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

  return (
    <>
      <Head>
        <title>OG Image Generation</title>
      </Head>

      <div className="flex flex-col items-center gap-4 mt-4 px-4">
        <main className="flex gap-4 flex-wrap justify-center">
          <div className="flex flex-col gap-2">
            <Input
              name="imageUrl"
              type="url"
              placeholder="URL da imagem"
              defaultValue={imageUrl}
              onChange={(event) => handleChangeImageUrl(event.target.value)}
            />

            <Input
              name="username"
              type="text"
              placeholder="Nome"
              defaultValue={username}
              onChange={(event) => handleChangeUsername(event.target.value)}
            />

            <Input
              name="lastname"
              type="text"
              placeholder="Sobrenome"
              defaultValue={lastname}
              onChange={(event) => handleChangeLastname(event.target.value)}
            />
          </div>

          <div className="w-[264px] h-[419px]">
            {imageUrl ? (
              <ImageWithLoader
                src={`${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}&username=${username}&lastname=${lastname}`}
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
            }${lastname ? `&lastname=${lastname}` : ""}`}
          </p>
        )}
      </div>
    </>
  );
}
