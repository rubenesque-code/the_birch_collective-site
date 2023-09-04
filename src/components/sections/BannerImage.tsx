import { Popover, Transition } from "@headlessui/react";
import { useWindowSize } from "react-use";

import { Icon } from "../icons";
import { StorageImage } from "../StorageImage";

import { type BannerImage as BannerImageType } from "~/pre-render-helpers/types";

export const BannerImage = ({ data }: { data: BannerImageType }) => (
  <div className="group/bannerImage relative aspect-[16/11] overflow-hidden sm:aspect-[16/9] 3xl:aspect-[14/3]">
    <StorageImage
      urls={data.connectedImage.urls}
      position={data.position}
      loading="eager"
    />

    {data.infoPopover ? (
      <InfoPopover position="right" text={data.infoPopover.text} />
    ) : null}
  </div>
);

type InfoPosition = "left" | "right";

const InfoPopover = ({
  position,
  text,
}: {
  position: InfoPosition;
  text: string;
}) => {
  const { width: windowWidth } = useWindowSize();

  return text.length ? (
    <Popover className={`absolute top-0 z-10 h-full w-full text-white`}>
      <Popover.Button>
        <div
          className={`absolute top-1 ${
            position === "left" ? "left-1" : "right-sm"
          }`}
        >
          <div className={`z-20 `}>
            <Icon.Info
              size={windowWidth > 768 ? 24 : 20}
              weight="fill"
              color="white"
            />
          </div>
          <div className="absolute left-0 top-0 -z-10 h-full w-full scale-90 rounded-full bg-black" />
        </div>
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          className={`absolute top-0 ${
            position === "right"
              ? "right-10 origin-top-right"
              : "left-10 origin-top-left"
          }  rounded-sm bg-gray-900 px-2 py-1 opacity-80`}
        >
          <p className="w-full">{text}</p>
        </Popover.Panel>
      </Transition>
    </Popover>
  ) : null;
};
