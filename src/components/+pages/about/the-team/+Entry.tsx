import Accordion from "~/components/Accordion";
import { StorageImage } from "~/components/StorageImage";
import Ui from "~/components/ui-elements";

import type { StaticData } from "../_static-data";

import { sectionIds } from "~/static-data/routes";
import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["theTeam"]>;

const TheTeam = ({ heading, members, text }: Data) => (
  <div id={sectionIds.about.meetTheTeam}>
    <Ui.Section.Heading className="text-brandOrange">
      {heading}
    </Ui.Section.Heading>

    <Ui.Section.VerticalSpace />

    <Ui.Section.Description>{text}</Ui.Section.Description>

    <Ui.Section.VerticalSpace />

    <Members members={members} />
  </div>
);

export default TheTeam;

const Members = ({ members }: { members: Data["members"] }) => (
  <div className="flex justify-center">
    <div className="grid gap-lg sm:grid-cols-2">
      {members.map((member) => (
        <Member member={member} key={member.id} />
      ))}
    </div>
  </div>
);

const Member = ({
  member: { bio, image, name, role },
}: {
  member: Data["members"][number];
}) => (
  <div className="flex flex-col items-center">
    <div className="relative aspect-[1/1] w-[200px] rounded-full">
      <StorageImage
        urls={image.connectedImage.urls}
        isCircle
        position={image.position}
        sizes="200px"
      />
    </div>
    <div className="mt-md">
      <div className={`text-center text-xl text-brandGreen`}>{name}</div>
      <div className={`text-center text-lg text-brandBrown`}>
        {role.length ? role : "role"}
      </div>
      <div className="mt-sm">
        <Accordion numLinesClamped={4}>
          <div className="custom-prose prose">{bio}</div>
        </Accordion>
      </div>
    </div>
  </div>
);
