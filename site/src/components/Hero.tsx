"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CIRCLE,
  FRAME,
  pickFeatured,
  pickTemplate,
  type HeroTemplate,
  type Point,
} from "@/data/hero";
import { Button } from "./Button";
import { HeroCard } from "./HeroCard";
import { Sticker } from "./Sticker";
import styles from "./Hero.module.css";

/** Сколько экрана прокрутки уходит на то, чтобы Хиро разошёлся под списком. */
const RUNWAY = 0.7;

/** Блок текста внутри кадра — координаты фрейма Content из макета. */
const CONTENT = { x: 380, y: 399.5, width: 1160 };

type Placed = { at: Point; rotate: number; scale: number; away: Point };

/**
 * Кадр макета 1920×1080 целиком вписывается в окно: `--k` — во сколько раз он
 * уменьшен или увеличен. Так стикеры, фото и надпись остаются сомасштабными
 * друг другу и макету на любой ширине.
 */
function fitFrame() {
  const k = Math.min(
    window.innerWidth / FRAME.width,
    window.innerHeight / FRAME.height,
  );
  document.documentElement.style.setProperty("--k", k.toFixed(4));
}

/** Стикер ставится центром в точку из макета; наклон и масштаб — уже внутри. */
function place(item: Placed, delay: string) {
  return {
    left: `${item.at.x}px`,
    top: `${item.at.y}px`,
    "--rotate": `${item.rotate}deg`,
    "--scale": item.scale,
    "--away-x": `${item.away.x}px`,
    "--away-y": `${item.away.y}px`,
    "--delay": delay,
  } as React.CSSProperties;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Шаблон выбирается после гидратации: на сервере случайность дала бы
  // рассинхрон разметки. До выбора виден только текст — он и так появляется первым.
  const [template, setTemplate] = useState<HeroTemplate | null>(null);
  const [featured, setFeatured] = useState("");

  useLayoutEffect(() => {
    fitFrame();
  }, []);

  useEffect(() => {
    setTemplate(pickTemplate());
    setFeatured(pickFeatured());
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const runway = window.innerHeight * RUNWAY;
      const progress = Math.min(1, Math.max(0, window.scrollY / runway));
      node.style.setProperty("--p", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      fitFrame();
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollToList = () => {
    document.getElementById("vacancies")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} ref={ref} aria-labelledby="hero-heading">
      <div className={styles.frame}>
        {template?.circle && (
          <div
            className={styles.circle}
            data-tone={template.circle.tone}
            style={{
              left: `${template.circle.x}px`,
              top: `${template.circle.y}px`,
              width: `${CIRCLE.width}px`,
              height: `${CIRCLE.height}px`,
              transformOrigin: `${template.circle.origin.x}px ${template.circle.origin.y}px`,
            }}
            aria-hidden
          />
        )}

        {template?.media && (
          <div
            className={styles.media}
            data-kind={template.media.kind}
            style={{
              left: `${template.media.box.x}px`,
              top: `${template.media.box.y}px`,
              width: `${template.media.box.width}px`,
              height: `${template.media.box.height}px`,
              "--shrink": template.media.shrink,
            } as React.CSSProperties}
            aria-hidden
          >
            <Image
              src={template.media.src}
              alt=""
              fill
              sizes="50vw"
              priority
              className={styles.mediaImage}
            />
          </div>
        )}

        <div
          className={styles.content}
          style={{
            left: `${CONTENT.x}px`,
            top: `${CONTENT.y}px`,
            width: `${CONTENT.width}px`,
          }}
        >
          <h1 className={styles.heading} id="hero-heading">
            Ищем людей
            <br />
            <span className={styles.accent}>в команду</span>
          </h1>

          <p className={styles.tagline}>
            Открытые вакансии, стажировки и практика в SoftClub
          </p>

          <div className={styles.actions}>
            <Button variant="secondary" size="large">
              Отправить резюме
            </Button>
            <Button variant="outline" size="large" onClick={scrollToList}>
              Смотреть вакансии
            </Button>
          </div>
        </div>

        {template?.card && (
          <div className={styles.anchor} style={place(template.card, "900ms")} aria-hidden>
            <div className={styles.floating}>
              <HeroCard vacancyId={featured} />
            </div>
          </div>
        )}

        {template?.stickers.map((sticker, index) => (
          <div
            key={sticker.id}
            className={styles.anchor}
            style={place(sticker, `${900 + index * 140}ms`)}
            aria-hidden
          >
            <div className={styles.floating}>
              <Sticker sticker={sticker} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
