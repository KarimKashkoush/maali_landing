"use client";

import { useState } from "react";
import { socialUrls } from "@/lib/home-content";
import { useUi } from "../providers/UiProvider";
import { socialChannels } from "./SocialIcons";

export default function SocialLinks({ align = "center" }: { align?: "center" | "start" }) {
  const { language, t } = useUi();
  const [notice, setNotice] = useState("");
  const style = "inline-flex size-[2.45rem] shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card p-0 leading-none text-brand transition-[color,background-color,transform] hover:-translate-y-0.5 hover:bg-brand hover:text-background focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand min-[481px]:size-11 [&_svg]:block [&_svg]:size-[1.1rem] [&_svg]:shrink-0";
  return <div>
    <div role="group" aria-label={t.hero.followUs} className={`flex flex-wrap gap-1.5 min-[481px]:gap-2.5 ${align === "start" ? "justify-start" : "justify-center lg:justify-start"}`}>
      {socialChannels.map(({ label, Icon }) => socialUrls[label] ? <a key={label} href={socialUrls[label]} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={style}><Icon /></a> : <button key={label} type="button" aria-label={label} title={language === "ar" ? `${label} — الرابط قريبًا` : `${label} — link coming soon`} onClick={() => setNotice(language === "ar" ? `سيُضاف رابط ${label} الرسمي قريبًا.` : `The official ${label} link will be added soon.`)} className={style}><Icon /></button>)}
    </div>
    {notice && <p role="status" className="mt-3 text-xs leading-6 text-muted-foreground">{notice}</p>}
  </div>;
}
