import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../_static-data";

import { route } from "~/static-data/routes";

type Data = StaticData["programmes"];

const ProgrammesList = ({ data }: { data: Data }) => (
  <div className="grid grid-cols-1 gap-md sm:gap-lg md:gap-xl">
    {data.map((programme) => (
      <Programme data={programme} key={programme.id} />
    ))}
  </div>
);

export default ProgrammesList;

const Programme = ({
  data: { id, summary, title, subtitle },
}: {
  data: Data[number];
}) => (
  <Link href={`${route.programmes}/${id}`} passHref>
    <div className="flex max-w-[850px] cursor-pointer flex-col rounded-xl py-xs hover:bg-gray-100 sm:px-xl sm:py-md md:px-2xl md:py-lg">
      <div className="flex flex-wrap items-end justify-between gap-x-xl md:flex-nowrap">
        <div className="font-display text-5xl font-bold tracking-wider text-brandOrange">
          {title}
        </div>

        <div className="mt-sm font-display text-2xl font-bold tracking-wide text-brandOrange opacity-90">
          {subtitle}
        </div>
      </div>

      <div className="custom-prose prose mt-xs max-w-full font-medium">
        <Markdown>{summary.mainText}</Markdown>
      </div>

      <div className="mt-md grid w-full gap-lg md:grid-cols-2">
        <div className="group/image relative aspect-[4/3] w-full">
          <StorageImage
            urls={summary.image.connectedImage.urls}
            position={summary.image.position}
            sizes="400px"
          />
        </div>
        <div>
          {summary.bullets.length ? (
            <div className="grid grid-cols-1 gap-xxs">
              {summary.bullets.map((bullet) => (
                <div
                  className="group/bullet flex items-start gap-sm"
                  key={bullet.id}
                >
                  <div className="relative translate-y-[6px] text-xs text-brandLightBrown">
                    <Icon.Bullet.Leaf />
                  </div>
                  <div className="flex-grow  text-gray-600">{bullet.text}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </Link>
);
