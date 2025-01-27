import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";

type MessagesType = {
  NavbarLinks: {
    homeTitle: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages: MessagesType = await getMessages({ locale }) as MessagesType;
  const title = messages.NavbarLinks.homeTitle;
  return {
    title,
  };
}

export default function Home() {
  const t = useTranslations("HomePage");
  return <div>{t("title")}</div>;
}
