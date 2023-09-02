import Link from "next/link";
import Markdown from "markdown-to-jsx";

import { StorageImage } from "~/components/StorageImage";

import type { StaticData } from "../_static-data";

import { route } from "~/static-data/routes";

type Data = StaticData["workshops"];

const WorkshopsList = ({ data }: { data: Data }) => (
  <div className="grid grid-cols-1 gap-2xl">
    {data.map((workshop) => (
      <Workshop data={workshop} key={workshop.id} />
    ))}
  </div>
);

export default WorkshopsList;

const Workshop = ({
  data: { id, summary, title, subtitle },
}: {
  data: Data[number];
}) => (
  <Link href={`${route.workshops}/${id}`}>
    <div className="flex max-w-[850px] cursor-pointer flex-col rounded-xl px-2xl py-lg hover:bg-gray-100">
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
        </div>
      </div>
    </div>
  </Link>
);
