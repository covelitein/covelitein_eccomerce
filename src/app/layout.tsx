import type { Metadata } from "next";
import { NextUITheme } from "@/client_theme";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/Montserrat-VariableFont_wght.woff2",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${
          process.env.VERCEL_URL || "covelitein-hub.vercel.app"
        }`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "CoveliteinsHub - Eccomerce demo project",
  description:
    "CoveliteHub provides state-of-the-art solutions for businesses, empowering innovation and growth with cutting-edge technology and seamless user experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "CoveliteinsHub - Empowering Businesses",
    description:
      "Explore CoveliteinsHub's innovative solutions to transform your business. Seamlessly crafted for desktop and mobile platforms.",
    type: "website",
    images: [
      {
        url: "https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/469693135_1370358640609131_8794368040634332744_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHgvAXBI3hQdmHZfvG9lYCQSCamk_Uh4JRIJqaT9SHglCa-oy0zXj7JEgJ5oTNTSn3l2To9mY8Mf8zevjaHwdBK&_nc_ohc=t-2zpAra09QQ7kNvgGD9hSc&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&_nc_gid=AvELAL3D3SZ_fS88fYxK2dB&oh=00_AYBNovQDQe45eareFpLo0ZX4d2cQFlCZs3qjSvZoZVku5Q&oe=675E5828",
        width: 1200,
        height: 630,
        alt: "CoveliteinsHub - Empowering Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoveliteinsHub - Your Gateway to Innovation",
    description:
      "Discover how CoveliteinsHub empowers businesses with innovative solutions, cutting-edge technology, and seamless user experiences.",
    images: [
      "https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/469693135_1370358640609131_8794368040634332744_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHgvAXBI3hQdmHZfvG9lYCQSCamk_Uh4JRIJqaT9SHglCa-oy0zXj7JEgJ5oTNTSn3l2To9mY8Mf8zevjaHwdBK&_nc_ohc=t-2zpAra09QQ7kNvgGD9hSc&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&_nc_gid=AvELAL3D3SZ_fS88fYxK2dB&oh=00_AYBNovQDQe45eareFpLo0ZX4d2cQFlCZs3qjSvZoZVku5Q&oe=675E5828",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NextUITheme>{children}</NextUITheme>
      </body>
    </html>
  );
}
