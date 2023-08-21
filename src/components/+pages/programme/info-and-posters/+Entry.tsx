import type { StaticData } from "../_static-data";
import PosterSlides from "./poster-slides/+Entry";

import type { MyExclude } from "~/types/utilities";

type Data = {
  info: StaticData["page"]["info"];
  posters: StaticData["page"]["posters"];
};

const InfoAndPosters = ({ info, posters }: Data) => (
  <div className="grid grid-cols-2 gap-lg">
    <div className="">
      <Info data={info} />
    </div>

    {posters === "not in use" ? null : (
      <div className="">
        <Posters data={posters} />
      </div>
    )}
  </div>
);

export default InfoAndPosters;

const Info = ({ data }: { data: Data["info"] }) => (
  <div className="grid grid-cols-1 gap-xs">
    {data.map((infoEntry) => (
      <Entry {...infoEntry} key={infoEntry.id} />
    ))}
  </div>
);

const Entry = ({ text, title }: Data["info"][number]) => (
  <div className="group/entry relative flex items-start gap-xs">
    <div className="relative font-bold">{title}</div>
    <div className="w-full text-gray-800">{text}</div>
  </div>
);

type PostersData = MyExclude<StaticData["page"]["posters"], "not in use">;

const Posters = ({ data }: { data: PostersData }) => (
  <div className="group/posters relative">
    <div>
      <div className="relative ml-xl h-[400px] overflow-visible ">
        <PosterSlides data={data} />
      </div>
    </div>
    <div className="text-right text-sm text-gray-500">flyers!</div>
  </div>
);
