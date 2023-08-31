import Markdown from "markdown-to-jsx";

import { Icon } from "~/components/icons";
import SignUpFormModal from "~/components/sign-up-form-modal/+Entry";

import type { StaticData } from "../_static-data";

import { strWithFallback } from "~/helpers/utilities";
import { type ExcludeNotInUse } from "~/types/database/_helpers";

type Data = ExcludeNotInUse<StaticData["page"]["signUp"]> & { title: string };

const SignUp = ({ buttonText, heading, text, notifyEmails, title }: Data) => (
  <div className="">
    <div className="text-center font-display text-5xl text-brandLightOrange">
      {strWithFallback(heading, "Sign Up")}
    </div>

    <div className="custom-prose prose mt-sm w-full max-w-full text-center">
      <Markdown>
        {strWithFallback(
          text,
          "This is a free event!<br />All young people welcome!",
        )}
      </Markdown>
    </div>

    <div className="mt-lg flex justify-center">
      <SignUpFormModal
        button={({ openModal }) => (
          <div
            className="flex cursor-pointer items-center gap-xs rounded-lg bg-orange px-sm py-xs font-display text-2xl font-bold text-white"
            onClick={openModal}
          >
            <div>
              <Icon.SignUp />
            </div>

            {strWithFallback(buttonText, "Sign Up")}
          </div>
        )}
        notifyEmails={notifyEmails}
        event={{
          name: title,
          type: "programme",
        }}
      />
    </div>
  </div>
);

export default SignUp;
