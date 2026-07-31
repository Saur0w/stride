"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

const para = "STRIDE invites her into a realm of luxurious desires, where each stiletto is a meticulously crafted masterpiece, telling stories of sophistication and exclusivity. Every step she takes embodies a fusion of her aspirations and the luxury that defines the essence of STRIDE.";

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const paraWrapperRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);
    const featuredBlockRef = useRef<HTMLDivElement>(null);
    const yearDisplayRef = useRef<HTMLDivElement>(null);

    const currentYear = new Date().getFullYear().toString();
    const century = currentYear.slice(0, 2);
    const decade = currentYear.slice(2);


    useGSAP(() => {
        if (!landingRef.current) return;

        const tl = gsap.timeline({
            delay: 5.2,
            defaults: {
                ease: "power4.out",
                duration: 1.1
            }
        });

        SplitText.create(paraRef.current!, {
            type: "lines",
            mask: "lines",
            linesClass: styles.textLine,
            autoSplit: true,
            onSplit: (self) => {
                return tl.from(self.lines, {
                    yPercent: -110,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.045,
                });
            }
        });

        tl.from(locationRef.current, {
            y: 35,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=0.7")

            .from(featuredBlockRef.current, {
                y: 35,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
            }, "-=0.8")

            .from(yearDisplayRef.current, {
                y: 35,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power3.out",
            },"-=0.8");

        if (paraWrapperRef.current) {
            gsap.fromTo(paraWrapperRef.current,
                {
                    yPercent: 40
                },
                {
                    yPercent: -40, ease: "none"
                });
        }


    }, { scope: landingRef });

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/images/main.jpg"
                    alt="Stride Hero Background"
                    fill
                    priority
                    unoptimized
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.content} ref={paraWrapperRef}>
                <p className={styles.text} ref={paraRef}>
                    {para}
                </p>
            </div>

            <footer className={styles.footer}>
                <div className={styles.locationBox} ref={locationRef}>
                    <div className={styles.barcode}>
                        <svg width="123" height="30" viewBox="0 0 123 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <mask id="mask0_1_30" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="123" height="30">
                                <rect width="123" height="29.1649" fill="url(#pattern0_1_30)"/>
                            </mask>
                            <g mask="url(#mask0_1_30)">
                                <rect x="-17.752" y="-16.4844" width="180.062" height="74.8144" fill="#FDEBDD"/>
                            </g>
                            <defs>
                                <pattern id="pattern0_1_30" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_1_30" transform="scale(0.0103093 0.0434783)"/>
                                </pattern>
                                <image id="image0_1_30" width="97" height="23" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAAXCAYAAAAbfSF/AAACA0lEQVRoBe1aO2tVQRA++QfapdPYpdDGIpVgIJDSEPBRSJr4JA8kmEoCKTTzba4QUvgHrGxUAhZ53OzsJU1IbOxs0urdWSGp0lgcmT33ylG4ckUsxDlwYM/O7Oxj+PY7s7MFJ+xwwn0f3SQLDlhQ6uvbuBYEW0VRFJzco1x/vHbGR4yHSItB8JoFH7M80nKQ1Sss2MzfQk99e2WEP9P5yp6bruygyRG3fcRUpYevnNAIQi9YcOITXQ6CZyoLQh9CpA0t+0Qvm5EusOANRzzWMeT2kcay/URXu2MNyS1pXSV3EyHiocpYcBiErrO4aZ2zyvUJQuutL2641cZFbecFN8qyHGDBNkd6wNFNdG2zuNlqPquDIblRFveksoEjFvdKy5zwtjZv1X+3++n5uc4472T9iN2sK1hjwak2qjvhfdUJynrnPmFB6/dO6OzvOKHVbgxpu5BwtzPAv+IEXZDvCxVpWfvM/ekC9umEZmxcynNPuNXLCV7cfNaR/pwQBHN1J/hE98wJv0CCOeEPtyNDgu6DPTjBtiPbjorMa8YJRsxGzPZ3tDJinGCcYJygEbMhwZBgSDAkoLRjixxE2tmRcYId4OlxiiHBkGBIMCTkzJrFCRYnGCdYnGBxwj+cY07YrxLZP962+K8S/UI3eyX6OxFwyX0m+lkwU88ndC88hJ9uW3wD+XrHlkVUORUAAAAASUVORK5CYII="/>
                            </defs>
                        </svg>
                    </div>

                    <div className={styles.addressCard}>
                        <div className={styles.cardHeader}>
                            <span>ENCHANTÉ STRIDE</span>
                            <span className={styles.tag}>/24</span>
                        </div>
                        <p>15 RUE DE LA MODE, HAUTE MARAIS</p>
                        <p>75001 PARIS, FRANCE</p>
                    </div>
                </div>

                <div className={styles.featureBlock} ref={featuredBlockRef}>
                    <h3>DESIRE</h3>
                    <p>
                        SPARK DESIRE WITH STILETTOS THAT EXUDE CONFIDENCE AND ALLURE IN EVERY STEP
                    </p>
                </div>

                <div className={styles.featureBlock} ref={featuredBlockRef}>
                    <h3>EXCLUSIVITY</h3>
                    <p>
                        UNVEIL EXCLUSIVITY, TAILORED FOR WOMEN WHO SEEK RARE ELEGANCE IN EVERY STEP.
                    </p>
                </div>

                <div className={styles.yearDisplay} ref={yearDisplayRef}>
                    <span className={styles.century}>{century}</span>
                    <div className={styles.decade}>
                        <span className={styles.slash}>/</span>
                        <span className={styles.digits}>{decade}</span>
                    </div>
                </div>
            </footer>
        </section>
    );
}