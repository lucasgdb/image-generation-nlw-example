/* eslint-disable @next/next/no-img-element */

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
    <div className="flex justify-center mt-4">
      <main className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col gap-2">
          <Input
            name="imageUrl"
            placeholder="URL da imagem"
            defaultValue={imageUrl}
            onChange={(event) => handleChangeImageUrl(event.target.value)}
          />

          <Input
            name="username"
            placeholder="Nome"
            defaultValue={username}
            onChange={(event) => handleChangeUsername(event.target.value)}
          />

          <Input
            name="lastname"
            placeholder="Sobrenome"
            defaultValue={lastname}
            onChange={(event) => handleChangeLastname(event.target.value)}
          />
        </div>

        <div className="w-[264px]">
          {imageUrl ? (
            <ImageWithLoader
              src={`${process.env.NEXT_PUBLIC_URL}/api/og?imageUrl=${imageUrl}&username=${username}&lastname=${lastname}`}
              alt="card"
              width={264}
              height={419}
            />
          ) : (
            <p className="text-center text-gray-900">Aguardando...</p>
          )}
        </div>
      </main>
    </div>
  );
}
