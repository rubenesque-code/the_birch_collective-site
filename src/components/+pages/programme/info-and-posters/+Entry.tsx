import type { StaticData } from "../_static-data";
import PosterSlides from "./poster-slides/+Entry";

import type { MyExclude } from "~/types/utilities";

type Data = {
  info: StaticData["page"]["info"];
  posters: StaticData["page"]["posters"];
  programmeTitle: string;
};

const InfoAndPosters = ({ info, posters, programmeTitle }: Data) => (
  <div className="grid gap-lg md:grid-cols-2">
    {info === "not in use" ? null : (
      <div className="">
        <Info data={info} />
      </div>
    )}

    {posters === "not in use" ? null : (
      <div className="">
        <Posters data={{ entries: posters, programmeTitle }} />
      </div>
    )}
  </div>
);

export default InfoAndPosters;

const Info = ({ data }: { data: MyExclude<Data["info"], "not in use"> }) => (
  <div className="grid grid-cols-1 gap-xs">
    {data.map((infoEntry) => (
      <Entry {...infoEntry} key={infoEntry.id} />
    ))}
  </div>
);

const Entry = ({
  text,
  title,
}: MyExclude<Data["info"], "not in use">[number]) => (
  <div className="group/entry relative flex items-start gap-xs">
    <div className="relative whitespace-nowrap font-bold">{title}</div>
    <div className="w-full text-gray-800">{text}</div>
  </div>
);

type PostersData = {
  entries: MyExclude<StaticData["page"]["posters"], "not in use">;
  programmeTitle: string;
};

const Posters = ({ data }: { data: PostersData }) => (
  <div className="group/posters relative">
    <div>
      <div className="relative h-[300px] overflow-visible sm:h-[400px] md:ml-xl">
        <PosterSlides data={data} />
      </div>
    </div>
  </div>
);
