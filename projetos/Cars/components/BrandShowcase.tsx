"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const brands = [
  {
    name: "Bugatti",
    logo: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Ferrari",
    logo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Lamborghini",
    logo: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Jaguar",
    logo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Bentley",
    logo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070&auto=format&fit=crop",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BrandScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0); // 0..1

  const activeIndex = useMemo(() => {
    const idx = Math.round(progress * (brands.length - 1));
    return clamp(idx, 0, brands.length - 1);
  }, [progress]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;

      // A sessão é alta. Quando o topo dela encosta no topo da tela, começa o progresso.
      // Quando o final dela sai do topo, termina.
      const total = el.offsetHeight - viewH;
      const scrolled = -rect.top; // quanto já "entrou" no topo
      const p = total <= 0 ? 0 : clamp(scrolled / total, 0, 1);

      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const el = sectionRef.current;
    if (!track || !el) return;

    // quanto o track pode andar (largura total - largura visível)
    const viewportW = track.parentElement?.clientWidth ?? window.innerWidth;
    const maxTranslate = Math.max(0, track.scrollWidth - viewportW);

    const x = -maxTranslate * progress;
    track.style.transform = `translate3d(${x}px,0,0)`;
  }, [progress]);

  const active = brands[activeIndex];

  return (
    <section
      ref={sectionRef as any}
      className="relative w-full"
      style={{ height: `${brands.length * 100}vh` }} // controla duração do efeito
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0b0b0f]">
        {/* grid (esquerda imagem, direita texto) */}
        <div className="mx-auto h-full w-full max-w-[1400px] px-6">
          <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* LEFT: imagens */}
            <div className="relative flex h-full items-center lg:col-span-8">
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {/* label no topo esquerdo */}
                <div className="absolute left-5 top-5 z-20 text-xs tracking-[0.35em] text-yellow-300/90">
                  TYPE R
                </div>

                {/* Track horizontal */}
                <div className="relative h-[62vh] w-full lg:h-[70vh]">
                  <div
                    ref={trackRef}
                    className="flex h-full w-max will-change-transform transition-transform duration-75"
                  >
                    {brands.map((b) => (
                      <div
                        key={b.name}
                        className="relative h-full w-[88vw] shrink-0 lg:w-[820px]"
                      >
                        <Image
                          src={b.logo}
                          alt={b.name}
                          fill
                          className="object-cover"
                          priority={b.name === brands[0].name}
                        />

                        {/* overlay gradient (cinema) */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* barra/bolinhas de progresso */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
                  {brands.map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        i === activeIndex
                          ? "w-10 bg-yellow-300"
                          : "w-3 bg-white/20",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: texto */}
            <div className="flex h-full items-center lg:col-span-4">
              <div className="w-full">
                <h2 className="text-3xl font-semibold text-white">
                  {active.name}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  Every trip with the accelerator is a joy ride. It&apos;s a
                  special engine, a little talisman against boredom and the
                  indignities of daily life. Experience the precision of
                  engineering and the thrill of a premium drive.
                </p>

                <button
                  className="mt-7 w-full rounded-full border border-yellow-300/80 bg-transparent px-6 py-4 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
                  type="button"
                >
                  View details
                </button>

                <div className="mt-6 text-xs text-white/40">
                  Scroll progress: {(progress * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* background giant text (bem sutil) */}
        <div className="pointer-events-none absolute left-6 top-10 hidden text-[120px] font-semibold tracking-tight text-white/[0.04] lg:block">
          JAGUAR
        </div>
      </div>
    </section>
  );
}
