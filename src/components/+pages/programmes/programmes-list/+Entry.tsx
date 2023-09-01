import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../_static-data";

import { route } from "~/static-data/routes";

type Data = StaticData["programmes"];

const ProgrammesList = ({ data }: { data: Data }) => (
  <div className="grid grid-cols-1 gap-xl">
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
}) => {
  return (
    <Link href={`${route.programmes}/${id}`}>
      <div className="flex cursor-pointer flex-col rounded-xl px-2xl py-lg hover:bg-gray-100">
        <div className="font-display text-5xl font-bold tracking-wider text-brandOrange">
          {title}
        </div>

        <div className="mt-sm font-display text-2xl font-bold tracking-wide text-brandOrange opacity-90">
          {subtitle}
        </div>

        <div className="mt-md grid w-full grid-cols-2 gap-lg">
          <div className="group/image relative aspect-[4/3] w-full">
            <StorageImage
              urls={summary.image.connectedImage.urls}
              position={summary.image.position}
            />
          </div>
          <div>
            <div className="custom-prose prose max-w-full font-medium">
              <Markdown>{summary.mainText}</Markdown>
            </div>
            {summary.bullets.length ? (
              <div className="mt-xs grid grid-cols-1 gap-xxs">
                {summary.bullets.map((bullet) => (
                  <div
                    className="group/bullet flex items-start gap-sm"
                    key={bullet.id}
                  >
                    <div className="relative translate-y-[6px] text-xs text-brandLightBrown">
                      <Icon.Bullet.Leaf />
                    </div>
                    <div className="flex-grow  text-gray-600">
                      {bullet.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};
