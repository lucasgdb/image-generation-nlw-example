/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import { useState } from "react";

import URL from "./components/templates/URL";
import Github from "./components/templates/Github";
import Radio from "./components/UI/atoms/Radio";

export default function Page() {
  const [method, setMethod] = useState<"url" | "github">("github");

  const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "url" && event.target.checked) {
      setMethod("url");
      return;
    }

    if (event.target.id === "github" && event.target.checked) {
      setMethod("github");
    }
  };

  return (
    <>
      <Head>
        <title>OG Image Generation</title>
      </Head>

      <main className="flex flex-col gap-4 items-center px-4 pt-4 pb-2">
        <div className="flex gap-3">
          <Radio
            name="method"
            id="github"
            checked={method === "github"}
            onChange={handleChangeMethod}
            label="Github"
          />

          <Radio
            name="method"
            id="url"
            checked={method === "url"}
            onChange={handleChangeMethod}
            label="URL"
          />
        </div>

        {method === "url" ? <URL /> : <Github />}
      </main>
    </>
  );
}
