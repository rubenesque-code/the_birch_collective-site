import Link from "next/link";

import StorageImage from "~/components/StorageImage";

type Props = {};

const Header = () => {
  return (
    <header test-id="header">
      <Large />
    </header>
  );
};

export { Header };

const Large = () => {
  return (
    <div
      className="z-50 hidden w-screen items-center justify-between bg-white px-4 py-6 md:flex lg:px-8 2xl:px-12"
      test-id="large"
    >
      <Link href={"/"} passHref>
        <div className="flex cursor-pointer items-center gap-2">
          <StorageImage layout="fixed" urlEndpoint={""} />
          <h3 className="font-display text-3xl font-bold tracking-wider text-display lg:text-4xl xl:text-6xl">
            {data.orgTitle}
          </h3>
        </div>
      </Link>
    </div>
  );
};
