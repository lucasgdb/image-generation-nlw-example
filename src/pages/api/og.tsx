/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const robotoRegular = await (await fetch(new URL('../../assets/Roboto-Regular.ttf', import.meta.url))).arrayBuffer();
  const robotoBold = await (await fetch(new URL('../../assets/Roboto-Bold.ttf', import.meta.url))).arrayBuffer();

  const { searchParams } = req.nextUrl;

  const githubUsername = searchParams.get('githubUsername');
  const cardType = searchParams.get('cardType') ?? 'explorer';

  const cardUrl =
    cardType === 'explorer'
      ? `${process.env.NEXT_PUBLIC_URL}/bg-explorer.png`
      : `${process.env.NEXT_PUBLIC_URL}/bg-ignite.png`;

  const getContent = async () => {
    if (!githubUsername) {
      const imageUrl = searchParams.get('imageUrl') ?? '';
      const username = searchParams.get('username') ?? '';
      const lastname = searchParams.get('lastname') ?? '';

      return { imageUrl, username, lastname };
    }

    const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const data = await response.json();

    const userExists = data?.message?.toLowerCase() !== 'not found';

    return {
      imageUrl: data.avatar_url ?? `${process.env.NEXT_PUBLIC_URL}/404.png`,
      username: data.name ?? '',
      lastname: userExists ? githubUsername : '404',
    };
  };

  const { imageUrl, username, lastname } = await getContent();

  return new ImageResponse(
    (
      <div tw="flex flex-col bg-transparent rounded-xl w-full h-full" style={{ backgroundImage: `url("${cardUrl}")` }}>
        <div tw="flex self-center w-[150px] h-[150px] border-solid border-4 border-[#f7dd43] rounded-full overflow-hidden mt-[100px]">
          {imageUrl && <img src={imageUrl} alt="avatar" tw="w-full h-full" />}
        </div>

        <div tw="flex flex-col mt-[98px] ml-6">
          {username && (
            <p tw="m-0 text-white text-[18px]" style={{ fontFamily: '"Roboto-Bold"' }}>
              {username}
            </p>
          )}

          {lastname && (
            <p tw="m-0 mt-1 text-[14px] text-white" style={{ fontFamily: '"Roboto-Regular"' }}>
              {lastname}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 264,
      height: 419,
      fonts: [
        {
          name: 'Roboto-Regular',
          data: robotoRegular,
          style: 'normal',
        },
        {
          name: 'Roboto-Bold',
          data: robotoBold,
          style: 'normal',
        },
      ],
    }
  );
}
