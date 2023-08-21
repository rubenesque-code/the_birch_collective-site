import Link from "next/link";

import { StorageImage } from "~/components/StorageImage";
import { WithTooltip } from "~/components/WithTooltip";

import type { StaticData } from "../_static-data";

import { useHovered } from "~/hooks";
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
}) => {
  const [linkElementIsHovered, { hoverHandlers }] = useHovered();

  return (
    <div className={`${linkElementIsHovered ? "bg-gray-100" : ""}`}>
      <div className={"flex gap-md"}>
        <div className="w-full max-w-[350px]">
          <WithTooltip text="go to page">
            <Link href={`${route.workshops}/${id}`}>
              <div
                className="group/image relative aspect-[4/3] w-full"
                {...hoverHandlers}
              >
                <StorageImage
                  urls={summary.image.connectedImage.urls}
                  position={summary.image.position}
                />
              </div>
            </Link>
          </WithTooltip>
        </div>

        <div className="flex-grow">
          <WithTooltip text="go to page">
            <Link href={`${route.workshops}/${id}`}>
              <div
                className="font-display text-5xl text-brandOrange"
                {...hoverHandlers}
              >
                {title}
              </div>
            </Link>
          </WithTooltip>

          <div className="mt-xxs font-display text-3xl text-brandOrange">
            {subtitle}
          </div>

          {summary.mainText.length ? (
            <div className="custom-prose_no-p-margin prose mt-xs max-w-full font-medium">
              {summary.mainText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
