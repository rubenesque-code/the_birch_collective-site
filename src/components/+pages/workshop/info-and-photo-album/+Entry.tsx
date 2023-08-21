import type { StaticData } from "../_static-data";
import PhotoAlbum from "./photo-album/+Entry";

import type { MyExclude } from "~/types/utilities";

type Data = {
  info: StaticData["page"]["info"];
  photoAlbum: StaticData["page"]["photoAlbum"];
};

const InfoAndPosters = ({ info, photoAlbum }: Data) => (
  <div className="flex gap-lg">
    {info === "not in use" ? null : (
      <div className="">
        <Info data={info} />
      </div>
    )}

    {photoAlbum === "not in use" ? null : (
      <div className="flex-grow">
        <PhotoAlbum data={photoAlbum} />
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
    <div className="relative font-bold">{title}</div>
    <div className="w-full text-gray-800">{text}</div>
  </div>
);
