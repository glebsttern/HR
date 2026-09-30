"use client";

import { useEffect, useLayoutEffect } from "react";
import { ABOUT, COMPANY_FACTS } from "@/data/company";
import { PLACED_FACTS } from "@/data/aboutHero";
import { FactSticker } from "./FactSticker";
import styles from "./AboutHero.module.css";

/** Кадр макета — тот же, что у Хиро вакансий. */
const FRAME = { width: 1920, height: 1080 };

/**
 * Кадр 1920×1080 целиком вписывается в окно: `--ka` — во сколько раз он
 * уменьшен. Ровно та же механика, что у Хиро вакансий, поэтому надпись
 * на обеих страницах выходит одного размера на экране.
 */
function fitFrame() {
  const k = Math.min(
    window.innerWidth / FRAME.width,
    window.innerHeight / FRAME.height,
  );
  document.documentElement.style.setProperty("--ka", k.toFixed(4));
}

export function AboutHero() {
  useLayoutEffect(() => {
    fitFrame();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fitFrame);
    return () => window.removeEventListener("resize", fitFrame);
  }, []);

  const facts = PLACED_FACTS.map((placed) => {
    const fact = COMPANY_FACTS.find((item) => item.id === placed.id);
    return fact ? { ...fact, ...placed } : null;
  }).filter((fact) => fact !== null);

  return (
    <section className={styles.hero} aria-labelledby="about-heading">
      <div className={styles.frame}>
        {facts.map((fact) => (
          <div
            className={styles.anchor}
            key={fact.id}
            style={
              {
                left: `${fact.at.x}px`,
                top: `${fact.at.y}px`,
                "--rotate": `${fact.rotate}deg`,
                "--scale": fact.scale,
                "--delay": fact.delay,
              } as React.CSSProperties
            }
            aria-hidden
          >
            <div className={styles.floating}>
              <FactSticker
                emoji={fact.emoji}
                value={fact.value}
                caption={fact.caption}
                position={fact.position}
              />
            </div>
          </div>
        ))}

        <div className={styles.content}>
          <h1 className={styles.heading} id="about-heading">
            Работа <span className={styles.accent}>с нами</span>
          </h1>

          <p className={styles.tagline}>{ABOUT.lead}</p>
        </div>

        <a className={styles.jump} href="#terms">
          Условия работы
        </a>
      </div>
    </section>
  );
}
