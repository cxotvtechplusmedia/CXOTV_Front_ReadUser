"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import imageHome from "../../../../public/home_icon.png";

const NavigationMenuthree = ({ category, subcategories }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // For desktop: separate dropdown states
    const [showExclusiveDropdown, setShowExclusiveDropdown] = useState(false);
    const [showHealthDropdown, setShowHealthDropdown] = useState(false);
    const [showInterviewDropdown, setShowInterviewDropdown] = useState(false);

    const HamburgerIcon = () => <FaBars size={16} />;
    const CloseIcon = () => <FaTimes size={16} />;

    // State to manage accordion menu items in mobile
    const [accordionState, setAccordionState] = useState({});

    // Function to toggle accordion state
    const toggleAccordion = (categoryName) =>
        setAccordionState((prevState) => ({
            ...prevState,
            [categoryName]: !prevState[categoryName],
        }));

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const isMobile = useMediaQuery({ maxWidth: 1023 });

    const hasExclusiveSubcategories =
        subcategories &&
        subcategories.data?.some(
            (subcategory) => (subcategory.attributes?.name || "").toLowerCase() === "thought leadership"
        );

    // Is this the Health Technology category?
    const isHealthCategory =
        category?.attributes?.name === "Health Technology" || category === "Health Technology";

    // Names to group under "Health IT News" dropdown (from CMS) - normalized compare
    // NOTE: added "healthcare it news" here so it will appear inside the dropdown and NOT as a top-level nav item.
    const healthItNames = [
        "health news",
        "features",
        "feature",
        "health business",
        "policy",
        "healthcare it news", // keeps this in dropdown only
    ];

    // Function to format URLs in lowercase for SEO
    const formatUrlForSEO = (name) => {
        return String(name || "").replace(/\s+/g, "-").toLowerCase();
    };

    // Robust case-insensitive exclusions.
    const isCommonExcluded = (rawName) => {
        if (!rawName) return false;
        const name = rawName.trim().toLowerCase();

        const excludedSet = new Set([
            "thought leadership",
            "bfsi videos",
            "education budget",
            "education feature",
            "education guest speak",
            "education interview",
            "m learning",
            "education policy",
            "education policy matter",
            "skill development",
            "videos",
            "steam career education",
        ]);

        if (excludedSet.has(name)) return true;
        return false;
    };

    // Names to include in Interview dropdown (and exclude from top-level nav)
    const interviewNamesSet = new Set([
        "cxo speak",
        "health webinars",
        "health interviews",
        "health video",
        "health videos",
    ]);

    // Split subcategories into:
    // - healthItNewsSubcategories → for dropdown
    // - otherSubcategories → for normal menu items
    let healthItNewsSubcategories = [];
    let otherSubcategories = [];

    if (subcategories?.data) {
        subcategories.data.forEach((subcategory) => {
            const rawName = subcategory.attributes?.name;
            if (!rawName) return;
            const name = rawName.trim();
            const nameLower = name.toLowerCase();

            // skip globally excluded items (case-insensitive)
            if (isCommonExcluded(name)) return;

            // If this subcategory is one of interview names, skip adding to top-level nav.
            if (interviewNamesSet.has(nameLower)) {
                return;
            }

            // For Health category, move specific names into "Health IT News" dropdown (including healthcare it news)
            if (isHealthCategory && healthItNames.includes(nameLower)) {
                healthItNewsSubcategories.push(subcategory);
            } else {
                otherSubcategories.push(subcategory);
            }
        });
    }

    // Interview dropdown items (static list) — includes Health Video
    const interviewItems = [
        { name: "CXO Speak", href: `/${formatUrlForSEO("CXO Speak")}` },
        { name: "Health Video", href: `/${formatUrlForSEO("Health Videos")}` },
        { name: "Health Webinars", href: `/${formatUrlForSEO("Health Webinars")}` },
        { name: "Health Interviews", href: `/${formatUrlForSEO("Health Interviews")}` },
    ];

    return (
        <div className="w-screen">
            {/* MOBILE MENU */}
            {isMobile && (
                <div className="lg:hidden text-black font-medium uppercase font-fira text-[16px] w-full">
                    <div className="flex justify-center items-center py-2">
                        <button onClick={toggleMobileMenu}>
                            {mobileMenuOpen ? (
                                <div className="flex gap-2 items-center">
                                    Menu <CloseIcon />
                                </div>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    Menu <HamburgerIcon />
                                </div>
                            )}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="w-full text-black font-medium uppercase font-fira text-[16px]">
                            {category && subcategories && (
                                <ul className="flex flex-col mt-5 mb-5 mx-auto w-[90%]">
                                    {/* Home (icon + text) */}
                                    <li className="py-2 flex items-center gap-2">
                                        <Link href="/" className="flex items-center gap-2">
                                            <Image
                                                src={imageHome}
                                                alt="Home"
                                                width={24}
                                                height={24}
                                                className="cursor-pointer"
                                            />
                                            <span>Home</span>
                                        </Link>
                                    </li>

                                    {/* Health IT News dropdown (MOBILE) */}
                                    {isHealthCategory && healthItNewsSubcategories.length > 0 && (
                                        <li className="py-2">
                                            <span onClick={() => toggleAccordion("Health IT News")} className="cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <p>Health IT News</p>
                                                    <IoIosArrowDown />
                                                </div>
                                            </span>

                                            {accordionState["Health IT News"] && (
                                                <ul className="flex flex-col mt-2 ml-4">
                                                    {healthItNewsSubcategories.map((subcategory) => (
                                                        <li key={subcategory.id} className="py-1">
                                                            <Link href={`/${formatUrlForSEO(subcategory.attributes?.name || "")}`}>
                                                                {subcategory.attributes?.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )}

                                    {/* Interview dropdown (MOBILE) */}
                                    <li className="py-2">
                                        <span onClick={() => toggleAccordion("Interview")} className="cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <p>Interview</p>
                                                <IoIosArrowDown />
                                            </div>
                                        </span>
                                        {accordionState["Interview"] && (
                                            <ul className="flex flex-col mt-2 ml-4">
                                                {interviewItems.map((it) => (
                                                    <li key={it.name} className="py-1">
                                                        <Link href={it.href}>{it.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>

                                    {/* Other subcategories (normal items, MOBILE) */}
                                    {otherSubcategories.map((subcategory) => (
                                        <li key={subcategory.id} className="py-2">
                                            <Link href={`/${formatUrlForSEO(subcategory.attributes?.name || "")}`}>
                                                {subcategory.attributes?.name}
                                            </Link>
                                        </li>
                                    ))}

                                    {/* Dropdown for Exclusive (MOBILE) */}
                                    {hasExclusiveSubcategories && (
                                        <li className="py-2">
                                            <span onClick={() => toggleAccordion("Exclusive")} className="cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <p>Exclusive</p>
                                                    <IoIosArrowDown />
                                                </div>
                                            </span>
                                            {accordionState["Exclusive"] && (
                                                <ul className="flex flex-col mt-2 ml-4">
                                                    <li className="py-1">
                                                        <Link href="/cxo-talk">CXO Talk</Link>
                                                    </li>
                                                    <li className="py-1">
                                                        <Link href="/thought-leadership">Thought Leadership</Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* DESKTOP MENU */}
            {!isMobile && (
                <div className="w-full text-black font-medium uppercase cursor-pointer font-fira text-[15px]">
                    {category && subcategories && (
                        <ul className="flex flex-wrap items-center justify-center gap-8 mt-5 mb-5 mx-auto w-[100%]">
                            {/* Home */}
                            <li>
                                <Link href="/" className="flex items-center gap-2">
                                    <Image
                                        src={imageHome}
                                        alt="Home"
                                        width={24}
                                        height={24}
                                        className="inline-block mr-2 cursor-pointer"
                                    />
                                    <span>Home</span>
                                </Link>
                            </li>

                            {/* Health IT News dropdown (DESKTOP) */}
                            {isHealthCategory && healthItNewsSubcategories.length > 0 && (
                                <li
                                    className="py-2 relative"
                                    onMouseEnter={() => setShowHealthDropdown(true)}
                                    onMouseLeave={() => setShowHealthDropdown(false)}
                                >
                                    <span className="cursor-pointer">
                                        <div className="flex items-center lg:gap-2 gap:0">
                                            <p>Health IT News</p>
                                            <IoIosArrowDown />
                                        </div>
                                    </span>
                                    {showHealthDropdown && (
                                        <ul className="absolute left-0 mt-2 bg-white shadow-lg z-30 px-2 w-52">
                                            {healthItNewsSubcategories.map((subcategory) => (
                                                <li key={subcategory.id} className="py-2">
                                                    <Link href={`/${formatUrlForSEO(subcategory.attributes?.name || "")}`}>
                                                        {subcategory.attributes?.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )}

                            {/* Interview dropdown (DESKTOP) */}
                            <li
                                className="py-2 relative"
                                onMouseEnter={() => setShowInterviewDropdown(true)}
                                onMouseLeave={() => setShowInterviewDropdown(false)}
                            >
                                <span className="cursor-pointer">
                                    <div className="flex items-center lg:gap-2 gap:0">
                                        <p>Interview</p>
                                        <IoIosArrowDown />
                                    </div>
                                </span>
                                {showInterviewDropdown && (
                                    <ul className="absolute left-0 mt-2 bg-white shadow-lg z-30 px-2 w-44">
                                        {interviewItems.map((it) => (
                                            <li key={it.name} className="py-2">
                                                <Link href={it.href}>{it.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>

                            {/* Other subcategories (normal items, DESKTOP) */}
                            {otherSubcategories.map((subcategory) => (
                                <li key={subcategory.id}>
                                    <Link href={`/${formatUrlForSEO(subcategory.attributes?.name || "")}`}>
                                        {subcategory.attributes?.name}
                                    </Link>
                                </li>
                            ))}

                            {/* Dropdown for Exclusive (DESKTOP) */}
                            {hasExclusiveSubcategories && (
                                <li
                                    className="py-2 relative"
                                    onMouseEnter={() => setShowExclusiveDropdown(true)}
                                    onMouseLeave={() => setShowExclusiveDropdown(false)}
                                >
                                    <span className="cursor-pointer">
                                        <div className="flex items-center lg:gap-2 gap:0">
                                            <p>Exclusive</p>
                                            <IoIosArrowDown />
                                        </div>
                                    </span>
                                    {showExclusiveDropdown && (
                                        <ul className="absolute left-0 mt-2 bg-white shadow-lg z-30 px-2 w-44">
                                            <li className="py-4">
                                                <Link href="/thought-leadership">Thought Leadership</Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavigationMenuthree;
