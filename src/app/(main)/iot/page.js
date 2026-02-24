import Iot from "./Iot";

export const metadata = {
    title: "IoT News & Connected Enterprise Insights | CXOTV",
    description:
        "IoT news, industrial use cases, and insights shaping connected enterprises and smart operations.",
    keywords:
        "IoT news, connected devices, industrial IoT, smart enterprise",

    alternates: {
        canonical: "https://cxotv.techplusmedia.com/iot",
    },

    openGraph: {
        title: "IoT News & Connected Enterprise Insights | CXOTV",
        description:
            "IoT news, industrial use cases, and insights shaping connected enterprises and smart operations.",
        url: "https://cxotv.techplusmedia.com/iot",
        siteName: "CXOTV",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Page() {
    return (
        <>
            {/* ✅ SEO-required H1 (hidden but crawlable) */}
            <h1 className="sr-only">
                IoT News & Connected Enterprise Insights
            </h1>

            <Iot />
        </>
    );
}
