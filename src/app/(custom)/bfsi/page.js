import BFSI from "./BFSI";

export const metadata = {
    title: "BFSI & Fintech Technology News | CXOTV",
    description:
        "BFSI and Fintech technology trends driving digital banking and financial services innovation.",
    keywords:
        "BFSI tech news, fintech trends, digital banking, CIO BFSI",

    alternates: {
        canonical: "https://cxotv.techplusmedia.com/bfsi",
    },

    openGraph: {
        title: "BFSI & Fintech Technology News | CXOTV",
        description:
            "BFSI and Fintech technology trends driving digital banking and financial services innovation.",
        url: "https://cxotv.techplusmedia.com/bfsi",
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
                BFSI & Fintech Technology News
            </h1>

            <BFSI />
        </>
    );
}
