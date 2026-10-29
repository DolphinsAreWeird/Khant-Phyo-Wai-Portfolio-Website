import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Myanmar, Shantell_Sans } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  axes: ["INFM", "BNCE"],
  variable: "--font-shantell",
  display: "swap",
});

// Only used by the Pyaw sample, so it isn't preloaded.
const myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["500"],
  variable: "--font-myanmar",
  display: "swap",
  preload: false,
});

const description =
  "Co-founder and CFO at Sonar AI and final-year AI and computer engineering student at CMKL University. I find the problem worth solving and get a team to build the fix.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: "Khant Phyo Wai | Product and AI systems",
  description,
  alternates: { canonical: "/" },
  icons: { apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Khant Phyo Wai | Product and AI systems",
    description,
    siteName: "Khant Phyo Wai",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Khant Phyo Wai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khant Phyo Wai",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#10151d" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Co-founder and CFO",
  worksFor: { "@type": "Organization", name: "Sonar AI", url: "https://sonaraudiobooks.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "CMKL University" },
  sameAs: Object.values(profile.links),
};

// Applied before first paint so a visitor's theme and side-comment choices
// don't flash back to the defaults on reload.
const prefsScript = `try{var d=document.documentElement,t=localStorage.getItem("kp-theme");if(t==="light"||t==="dark")d.dataset.theme=t;if(localStorage.getItem("kp-annotations")==="off")d.dataset.annotations="off"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: prefsScript may set data attributes on <html>
    // before React hydrates.
    <html
      lang="en"
      className={`${archivo.variable} ${shantell.variable} ${myanmar.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
