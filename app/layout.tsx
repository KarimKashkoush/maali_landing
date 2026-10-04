import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/layout/Navbar";
import { UiProvider } from "./_components/providers/UiProvider";
import CursorFollower from "./_components/ui/CursorFollower";
import SmoothScroll from "./_components/ui/SmoothScroll";

const cairo = localFont({
  src: "./fonts/Cairo-Variable.ttf",
  variable: "--font-cairo",
  weight: "200 1000",
  style: "normal",
  display: "swap",
});

const ping = localFont({
  src: [
    { path: "./fonts/PingARLT-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/PingARLT-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-ping",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدارس المعالي الإبداعية الأهلية",
  description: "مدارس المعالي الإبداعية هي مؤسسة تعليمية رائدة تهدف إلى تقديم تجربة تعليمية متكاملة تجمع بين التميز الأكاديمي، والإبداع، والتقنيات الحديثة، والقيم التربوية. نعمل على توفير بيئة تعليمية محفزة وآمنة تساعد الطلاب على اكتشاف قدراتهم، وتنمية مهاراتهم، وتعزيز التفكير والإبداع، وبناء شخصية متوازنة قادرة على مواكبة تحديات المستقبل وصناعة أثر إيجابي في المجتمع.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ping.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('maali-language')==='en'?'en':'ar';var s=localStorage.getItem('maali-theme');var d=s==='dark'||(s===null&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <UiProvider>
          <CursorFollower />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </UiProvider>
      </body>
    </html>
  );
}
