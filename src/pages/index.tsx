/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import { useState } from 'react';

import URL from './components/templates/URL';
import Github from './components/templates/Github';
import Radio from './components/UI/atoms/Radio';

export default function Page() {
  const [method, setMethod] = useState<'url' | 'github'>('github');

  const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'url' && event.target.checked) {
      setMethod('url');
      return;
    }

    if (event.target.id === 'github' && event.target.checked) {
      setMethod('github');
    }
  };

  return (
    <>
      <Head>
        <title>NLW | OG Image Generation</title>
      </Head>

      <h1 className="text-gray-900 font-bold text-2xl text-center mt-4">OG Image Generation</h1>

      <main className="flex flex-col gap-4 items-center mt-4 px-4 pb-4">
        <div className="flex gap-3">
          <p className="m-0">Tipo:</p>

          <Radio name="method" id="github" checked={method === 'github'} onChange={handleChangeMethod} label="Github" />
          <Radio name="method" id="url" checked={method === 'url'} onChange={handleChangeMethod} label="URL" />
        </div>

        {method === 'url' ? <URL /> : <Github />}
      </main>
    </>
  );
}
