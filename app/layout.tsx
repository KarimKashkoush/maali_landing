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
  preload: false,
  weight: "200 1000",
  style: "normal",
  display: "swap",
});

const ping = localFont({
  src: [
    { path: "./fonts/PingARLT-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/PingARLT-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-ping",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدارس المعالي الإبداعية الأهلية",
  description: "اكتشف مدارس المعالي الإبداعية الأهلية: قسم وطني للبنين وقسم عالمي من الروضة حتى الثانوية، في بيئة تعليمية تنمّي المعرفة والإبداع والطموح.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "مدارس المعالي الإبداعية الأهلية",
    title: "مدارس المعالي الإبداعية الأهلية",
    description: "تعرف على مدارسنا ومراحلنا التعليمية في القسم الوطني للبنين والقسم العالمي من الروضة حتى الثانوية.",
  },
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
