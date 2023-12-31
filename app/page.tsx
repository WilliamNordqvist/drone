import { LogoIcon } from "@/icons";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-screen mb-40 overflow-hidden">
      <div className="h-full overflow-hidden bg-cover bg-no-repeat bg-center bg-[url(https://cdn.midjourney.com/2ed43156-0e65-47af-bc3f-3a47e1556a1a/0_2.png)] ">
        <div className="absolute top-20 left-10 w-[200px]">
          <LogoIcon />
        </div>
        <div className=" h-full w-full overflow-hidden bg-fixed bg-[hsla(0,0%,0%,0.45)]">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                All you drones on one page <br />
                <span>get started today</span>
              </h1>
              <Link
                className="mb-2 inline-block rounded-full border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 md:mr-2 md:mb-0"
                data-te-ripple-init
                data-te-ripple-color="light"
                href="/dashboard"
                role="button"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-2.5 text-white dark:text-neutral-800 md:-mt-4 lg:-mt-6 xl:-mt-10 h-[50px] scale-[2] origin-[top_center]">
        <svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z"
            fill="black"
          ></path>
        </svg>
      </div>
    </section>
  );
}
