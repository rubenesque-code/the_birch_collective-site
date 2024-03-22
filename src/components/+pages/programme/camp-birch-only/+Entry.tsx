import React from "react";
import { Transition } from "@headlessui/react";
import payment_suggestions from "public/images/camp_birch-payment_structure.jpg";
import { createPortal } from "react-dom";

import Ui from "~/components/ui-elements";

import { textColourSwith } from "~/helpers/style-switch";
import { NextImage } from "~/lib/external-packages-rename";

const CampBirchOnly = () => {
  const [showZoomedImage, setShowZoomedImage] = React.useState(false);

  return (
    <>
      <ZoomedImage
        show={showZoomedImage}
        close={() => setShowZoomedImage(false)}
      />

      <div>
        <Ui.Section.Heading
          className={`${textColourSwith("orange")} !text-left`}
        >
          Pay what you can
        </Ui.Section.Heading>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          The true cost of a place on Camp Birch is £750 per person. The cost
          reflects:
          <ul>
            <li>
              Highly trained staff and high ratio’s, with 4 paid members of
              staff on the camp and a kitchen volunteer- meaning that there is
              one member of staff for every 3 people on the camp. This enables
              us to ensure everyone is safe and has everything they need during
              our time together.
            </li>
            <li>Travel on a mini bus paid for from Bristol.</li>
            <li>All food and drinks for the week provided.</li>
            <li>
              Free reign of 120 acres of beautiful wild space in the Devon
              countryside.
            </li>
          </ul>
          We have been generously funded for this camp, meaning that we can
          offer a hugely subsidised rate to those who need it. If you do have
          the financial means to contribute it means that in the future we can
          provide more camps for more people who may have a little less than
          yourself. We get more than double the amount of applicants we can take
          and we are seeking to have a blend of people paying from these
          different payment bands:
        </div>

        <div
          className="relative aspect-[5/3] w-full cursor-zoom-in"
          onClick={() => setShowZoomedImage(true)}
        >
          <NextImage
            alt=""
            src={payment_suggestions}
            fill
            placeholder="blur"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <Ui.Page.VerticalSpace />

        <Ui.Section.Heading
          className={`${textColourSwith("green")} !text-left`}
        >
          Quotes from last years participants
        </Ui.Section.Heading>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <p>
            &quot;The time I got to spend with others on the camp was just
            something so magical and wonderful and beautiful I can&apos;t fully
            describe it. If you find interacting with others difficult or
            intimidating, or if you&apos;re struggling with your mental health,
            please consider giving it a go. It was absolutely worth it and I am
            incredibly thankful I got to go.&quot;
          </p>
          <p>
            &quot;A crazy nerve wracking experience that none of us would
            typically do that became one of the best times of my life. A time of
            testing yourself, forming friendships, learning more about the world
            and myself.&quot;
          </p>
          <p>
            &quot;It&apos;s a magical and unique experience, where you get the
            opportunity to escape the loneliness of city life. A few days spent
            connecting with peers, nature, and yourself, under the guidance of
            some knowledgeable and lovely people.&quot;
          </p>
          <p>
            &quot;I&apos;ve felt a lasting boost in my confidence which I&apos;m
            very grateful for.&quot;
          </p>
          <p>
            &quot;A magical experience! A great mix of practical things, nature
            celebration, and fun.&quot;
          </p>
          <p>
            &quot;I like the way it was laid back and self/campers led, lots of
            opportunity to chat to others and get to know each other, really
            felt bonded at the end of the trip - but also felt safe to have time
            alone&quot;
          </p>
        </div>

        <Ui.Page.VerticalSpace />

        <Ui.Section.Heading
          className={`${textColourSwith("brown")} !text-left`}
        >
          Quotes from last years referrers
        </Ui.Section.Heading>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <p>
            &quot;B reflected on an experience that enabled her to feel
            connected with herself and nature. She developed strategies to
            assist reflection on her thoughts and emotions. She felt the
            experience reduced the intensity of emotions from the outside world
            and this enabled her to feel relaxed. Additionally, she really
            enjoyed developing new skills and the experience of coming together
            with new people- which she generally struggles with. After camp, the
            experience assisted with her transition to University, which was a
            huge change to her daily routine, but B felt she was enabled to
            manage this. Thank you &quot;
          </p>
          <p className="text-gray-500">
            - Emma Martin | Senior Personal Adviser | Bristol Through Care Team
          </p>
          <p>
            &quot;We recently had several young people join TBC on their camp
            and the positive response we received from the young people has been
            amazing. Beyond simply building on their personal development
            skills, the camp offered a chance for them to build long lasting
            friendships and has obviously had a huge impact on mental
            well-being. Outside of The Birch Collective, that impact has
            supported confidence in returning to education, looking for
            volunteering opportunities and the overall well-being of the young
            people involved. I would highly recommend The Birch Collective for
            young people; getting out into nature clearly has a positive impact,
            but also allows them to gain long-term confidence building through
            the sessions. Plus it looks so much fun!&quot;
          </p>
          <p className="text-gray-500">
            - Rosie Kinnear | Youth Development Lead | The Prince&apos;s Trust
          </p>
        </div>

        <Ui.Page.VerticalSpace />

        <Ui.Section.Heading
          className={`${textColourSwith("orange")} !text-left`}
        >
          How to find out more information
        </Ui.Section.Heading>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <p>
            We will be holding a pre application online session on zoom for you
            to find out more information and ask any questions you have on
            Tuesday 2nd April at 5pm for half an hour.{" "}
            <a
              href="https://us06web.zoom.us/j/81309399557?pwd=G4odxyIsK4Hqyt2zoEcxQbbC3KNXv9.1"
              target="_blank"
            >
              Click here to join the meeting
            </a>{" "}
            (Meeting ID: 813 0939 9557 | Passcode: 351868).
          </p>
          <p>
            We will also record this- if you would like a recording please get
            in touch. If you would rather have a 1:1 chat, give us a call.
          </p>
        </div>

        <Ui.Page.VerticalSpace />

        <Ui.Section.Heading
          className={`${textColourSwith("green")} !text-left`}
        >
          How to apply
        </Ui.Section.Heading>

        <div className="custom-prose prose mt-sm w-full max-w-full">
          <p>
            To apply please fill in an interest form and email to
            ro@thebirchcollective.co.uk. You can fill this in yourself, or you
            could get a family member or a professional you work with to do it
            on your behalf. You can find this interest form here. (link to form-
            this is attached to the email).
          </p>
          <p>Deadline for application is: 30th April</p>
          <p>
            Please note that filling in an application form doesn’t guarantee
            you a place! We will have a look at all the applications and choose
            a group who we think will get the most out of the opportunity and
            let all applicants know by the 8th May.
          </p>
          <p>
            We welcome people of every race, gender, sexuality, ability, faith
            and class to come and join us.
          </p>
        </div>
      </div>
    </>
  );
};

export default CampBirchOnly;

const ZoomedImage = ({ show, close }: { show: boolean; close: () => void }) =>
  createPortal(
    <Transition show={show}>
      <Transition.Child
        as="div"
        className="fixed inset-0 z-[60] grid place-items-center overflow-auto bg-white/90"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={`relative cursor-zoom-out`}
          style={{
            aspectRatio: 5 / 3,
            width: "100vh",
          }}
          onClick={close}
        >
          <NextImage
            alt=""
            src={payment_suggestions}
            fill
            placeholder="blur"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </Transition.Child>
    </Transition>,
    document.body,
  );
