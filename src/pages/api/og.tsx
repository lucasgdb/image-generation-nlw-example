/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const fontRegular = fetch(
  new URL("../../assets/Roboto-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontBold = fetch(
  new URL("../../assets/Roboto-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const robotoRegular = await fontRegular;
  const robotoBold = await fontBold;

  const { searchParams } = req.nextUrl;
  const imageUrl = searchParams.get("imageUrl");
  const username = searchParams.get("username");
  const lastname = searchParams.get("lastname");

  return new ImageResponse(
    (
      <div
        tw="flex flex-col bg-transparent rounded-xl w-full h-full"
        style={{
          backgroundImage: "url(https://i.imgur.com/etPVtuz.png)",
        }}
      >
        <div tw="flex self-center w-[150px] h-[150px] border-solid border-4 border-[#f7dd43] rounded-full overflow-hidden mt-[100px]">
          {imageUrl && <img src={imageUrl} alt="avatar" tw="w-full h-full" />}
        </div>

        <div tw="flex flex-col mt-[98px] ml-6">
          {username && (
            <p
              tw="m-0 text-white text-[18px]"
              style={{ fontFamily: '"Roboto-Bold"' }}
            >
              {username}
            </p>
          )}

          {lastname && (
            <p
              tw="m-0 mt-1 text-[14px] text-white"
              style={{ fontFamily: '"Roboto-Regular"' }}
            >
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
          name: "Roboto-Regular",
          data: robotoRegular,
          style: "normal",
        },
        {
          name: "Roboto-Bold",
          data: robotoBold,
          style: "normal",
        },
      ],
    }
  );
}
