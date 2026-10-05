"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { schoolBranches } from "@/lib/school-site-content";
import { useUi } from "../providers/UiProvider";

export default function SchoolLocations() {
  const { language } = useUi();
  const ar = language === "ar";
  const [selected, setSelected] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const branch = schoolBranches[selected];
  const coordinates = `${branch.latitude},${branch.longitude}`;
  return <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card lg:grid lg:grid-cols-[.8fr_1.2fr]">
      <div className="p-6 sm:p-8"><h3 className="flex items-center gap-3 text-2xl font-black"><MapPin className="size-7 shrink-0 text-brand" aria-hidden="true" /><span>{ar ? "نلقاكم في الطائف" : "Visit us in Taif"}</span></h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{ar ? "اختر الفرع لعرض العنوان والاتجاهات، ونسّق موعد زيارتك مع فريقنا." : "Choose a campus for its location and directions, and arrange your visit with our team."}</p><label className="mt-6 block text-sm font-bold">{ar ? "الفرع" : "Campus"}<select value={selected} onChange={(e) => { setSelected(Number(e.target.value)); setShowMap(false); }} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground">{schoolBranches.map((item, i) => <option key={item.id} value={i}>{item.name[language]}</option>)}</select></label><p className="mt-4 text-sm leading-7">{branch.name[language]}<br />{ar ? "الطائف، المملكة العربية السعودية" : "Taif, Saudi Arabia"}</p><a href="tel:920014984" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-brand"><Phone className="size-4 shrink-0" aria-hidden="true" /><span dir="ltr">920014984</span></a><a href={`https://www.google.com/maps/search/?api=1&query=${coordinates}`} target="_blank" rel="noopener noreferrer" className="mt-3 block w-fit text-sm font-bold text-brand underline underline-offset-4">{ar ? "افتح الاتجاهات في خرائط Google" : "Open directions in Google Maps"}</a></div>
      <div className="grid min-h-80 place-items-center border-t border-border bg-muted/60 lg:border-t-0 lg:border-s">
        {showMap ? <iframe key={branch.id} title={`${ar ? "خريطة" : "Map:"} ${branch.name[language]}`} src={`https://maps.google.com/maps?q=${coordinates}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-full min-h-96 w-full border-0" /> : <div className="max-w-sm p-7 text-center"><MapPin className="mx-auto size-12 text-brand" strokeWidth={1.3} aria-hidden="true" /><p className="my-5 text-lg font-bold">{branch.name[language]}</p><button type="button" onClick={() => setShowMap(true)} className="min-h-12 cursor-pointer rounded-xl bg-brand-solid px-6 py-3 text-sm font-bold text-white">{ar ? "عرض الخريطة" : "Load map"}</button></div>}
      </div>
    </div>
  </div>;
}
