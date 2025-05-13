// import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
// import Section1 from "./components/Section1";
// import Section2 from "./components/Section2";
// import Section3 from "./components/Section3";
// import Section4 from "./components/Section4";
// import Section5 from "./components/Section5";
// import Section6 from "./components/Section6";

import UpdatedSection1 from "./updatedHome/UpdatedSection1";
import UpdatedSection2 from "./updatedHome/UpdatedSection2";
import UpdatedSection3 from "./updatedHome/UpdatedSection3";
import UpdatedSection4 from "./updatedHome/UpdatedSection4";
import UpdatedSection5 from "./updatedHome/UpdatedSection5";
import UpdatedSection7 from "./updatedHome/UpdatedSection7";
import UpdatedSection8 from "./updatedHome/UpdatedSection8";



type MessagesType = {
  NavbarLinks: {
    homeTitle: string;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages: MessagesType = (await getMessages({ locale })) as MessagesType;
  const title = messages.NavbarLinks.homeTitle;
  return {
    title,
  };
}

export default function Home() {
  // const t = useTranslations("HomePage");
  return (
    <div className="">
      {/* <CavemanNotFound /> */}
      <UpdatedSection1 />
      <UpdatedSection2 />
      <UpdatedSection3 />
      <UpdatedSection4 />
      <UpdatedSection5 />
      <UpdatedSection7 />
      <UpdatedSection8 />
      {/* <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 /> */}
      {/* <h1 className="text-3xl font-bold mb-8">{t("title")}</h1> */}
    </div>
  );
}