import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import PropertyCard from "../components/property/PropertyCard";
import { CardSkeleton } from "../components/ui/LoadingState";

import { useApi } from "../hooks/useApi";
import { useAppState } from "../context/AppStateContext";
import { propertyApi } from "../api/services";
import { demoProperties } from "../data/demo/properties";

import {
  ChevronRight,
  Search,
  Building2,
  ShieldCheck,
  Star,
} from "../components/icons";

export default function Home() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useAppState();

  const [where, setWhere] = useState("Bengaluru");
  const [checkIn, setCheckIn] = useState("2026-09-03");
  const [checkOut, setCheckOut] = useState("2026-09-10");

  const { data: properties, loading } = useApi(
    () => propertyApi.list(),
    demoProperties,
    {
      transform: (d) =>
        Array.isArray(d) ? d : d.properties || demoProperties,
    }
  );

  const stats = useMemo(() => {
    const cities = new Set(
      properties.map((p) =>
        (p.city || "").split(",").pop().trim()
      )
    ).size;

    const avgPrice = Math.round(
      properties.reduce(
        (s, p) => s + (p.price || 300),
        0
      ) / (properties.length || 1)
    );

    const totalBeds = properties.reduce(
      (s, p) => s + (p.bedsCount || 20),
      0
    );

    return [
      {
        label: "Verified stays",
        value: String(properties.length || 4).padStart(2, "0"),
      },
      {
        label: "Cities covered",
        value: String(cities || 3).padStart(2, "0"),
      },
      {
        label: "Avg. price / night",
        value: `₹${avgPrice}`,
      },
      {
        label: "Beds on the network",
        value: `${totalBeds}+`,
      },
    ];
  }, [properties]);

  const search = (e) => {
    e.preventDefault();

    navigate(
      `/properties?city=${encodeURIComponent(
        where
      )}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  };

  return (
    <>
      {/* =========================================================
          ANIMATION STYLES
      ========================================================= */}
      <style>{`
        @keyframes roostHeroUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes roostFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes roostFloatOne {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes roostFloatTwo {
          0%, 100% {
            transform: translateY(0) translateX(32px) rotate(2deg);
          }
          50% {
            transform: translateY(9px) translateX(32px) rotate(3deg);
          }
        }

        @keyframes roostSearch {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes roostCardUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes roostLine {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .roost-hero-1 {
          animation: roostHeroUp 0.7s ease-out both;
        }

        .roost-hero-2 {
          animation: roostHeroUp 0.7s 0.12s ease-out both;
        }

        .roost-hero-3 {
          animation: roostHeroUp 0.7s 0.22s ease-out both;
        }

        .roost-hero-4 {
          animation: roostHeroUp 0.7s 0.32s ease-out both;
        }

        .roost-stats {
          animation: roostFade 0.8s 0.55s ease-out both;
        }

        .roost-search {
          animation: roostSearch 0.7s 0.35s ease-out both;
        }

        .roost-float-one {
          animation: roostFloatOne 4.5s ease-in-out infinite;
        }

        .roost-float-two {
          animation: roostFloatTwo 5s 0.4s ease-in-out infinite;
        }

        .roost-reveal {
          animation: roostCardUp 0.65s ease-out both;
        }

        .roost-line {
          animation: roostLine 0.8s 0.7s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .roost-hero-1,
          .roost-hero-2,
          .roost-hero-3,
          .roost-hero-4,
          .roost-stats,
          .roost-search,
          .roost-float-one,
          .roost-float-two,
          .roost-reveal,
          .roost-line {
            animation: none !important;
          }
        }
      `}</style>

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#faf8f5]">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-24">

          {/* LEFT */}
          <div>
            <p className="eyebrow roost-hero-1">
              A BETTER WAY TO STAY
            </p>

            <h1 className="roost-hero-2 mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
              Simple bed booking for{" "}
              <i className="text-brand-600 not-italic">
                modern shared spaces.
              </i>
            </h1>

            <p className="roost-hero-3 mt-4 max-w-md text-[15px] leading-relaxed text-ink-500">
              Find your next community, book the right bed,
              and settle in — all with a few thoughtful clicks.
            </p>

            <div className="roost-hero-4 mt-7 flex flex-wrap items-center gap-5">

              <Link
                to="/properties"
                className="btn-primary group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              >
                Find your bed

                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/properties"
                className="link-quiet transition-all duration-300 hover:translate-x-1"
              >
                How ROOST works
              </Link>

            </div>

            <div className="rail-divider roost-line mt-10 max-w-md" />

            {/* STATS */}
            <div className="roost-stats grid max-w-md grid-cols-4 gap-2">

              {stats.map((s, index) => (
                <div
                  key={s.label}
                  className="group transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${0.6 + index * 0.08}s`,
                  }}
                >
                  <b className="block text-lg font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
                    {s.value}
                  </b>

                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                    {s.label}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* =====================================================
              FLOATING ROOM CARDS
          ===================================================== */}
          <div className="relative flex min-h-[300px] items-center justify-center">

            {/* Decorative background circle */}
            <div className="absolute h-64 w-64 rounded-full bg-brand-50 opacity-60 blur-3xl" />

            {/* CARD 1 */}
            <div
              className="
                roost-float-one
                relative
                z-10
                w-full
                max-w-xs
                rounded-2xl
                border
                border-ink-100
                bg-white
                p-4
                shadow-pop
                transition-shadow
                duration-500
                hover:shadow-xl
              "
            >
              <div className="rail-divider mb-3" />

              <p className="text-xs font-bold text-ink-900">
                Room 101 · Upper bunk
              </p>

              <p className="text-[11px] text-ink-400">
                Roost Hostel, Bengaluru
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="badge bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  AVAILABLE
                </span>

                <b className="text-sm text-ink-900">
                  ₹300/night
                </b>
              </div>
            </div>

            {/* CARD 2 */}
            <div
              className="
                roost-float-two
                absolute
                top-10
                z-20
                w-full
                max-w-xs
                rounded-2xl
                border
                border-ink-100
                bg-white
                p-4
                shadow-card
                transition-shadow
                duration-500
                hover:shadow-xl
              "
            >
              <div className="rail-divider mb-3" />

              <p className="text-xs font-bold text-ink-900">
                Room 201 · Lower bunk
              </p>

              <p className="text-[11px] text-ink-400">
                Sunrise Hostel, Pune
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="badge bg-sun-100 text-sun-700 ring-1 ring-sun-200">
                  2 LEFT
                </span>

                <b className="text-sm text-ink-900">
                  ₹350/night
                </b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEARCH
      ========================================================= */}
      <form
        onSubmit={search}
        className="
          roost-search
          container-page
          -mt-8
          grid
          gap-3
          rounded-2xl
          border
          border-ink-100
          bg-white
          p-4
          shadow-pop
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-xl
          sm:grid-cols-[1.2fr_1fr_1fr_auto]
          sm:p-5
        "
      >
        <label className="field">
          <span className="label">Where</span>

          <input
            className="input transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Check-in</span>

          <input
            type="date"
            className="input transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Check-out</span>

          <input
            type="date"
            className="input transition-all duration-300 focus:-translate-y-0.5 focus:shadow-md"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>

        <button
          className="
            btn-primary
            group
            self-end
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            active:translate-y-0
          "
        >
          Search beds

          <ChevronRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>

      {/* =========================================================
          FEATURED STAYS
      ========================================================= */}
      <section className="py-16">
        <div className="container-page mb-6 flex items-end justify-between gap-4">

          <div>
            <p className="eyebrow">
              TRENDING THIS WEEK
            </p>

            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">
              Featured stays
            </h2>
          </div>

          <Link
            to="/properties"
            className="link-quiet hidden transition-transform duration-300 hover:translate-x-1 sm:inline"
          >
            See all stays →
          </Link>
        </div>

        <div className="container-page flex gap-4 overflow-x-auto pb-3 scrollbar-thin">

          {loading ? (
            [1, 2, 3, 4].map((x) => (
              <CardSkeleton
                key={x}
                className="h-64 w-64 shrink-0"
              />
            ))
          ) : (
            properties.map((p, index) => (
              <div
                key={p.slug || p.id}
                className="roost-reveal shrink-0"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="transition-transform duration-300 hover:-translate-y-2">
                  <PropertyCard
                    property={p}
                    compact
                    favorite={favorites.includes(p.slug)}
                    onFavorite={() =>
                      toggleFavorite(p.slug)
                    }
                  />
                </div>
              </div>
            ))
          )}

        </div>
      </section>

      <div className="container-page">
        <div className="rail-divider" />
      </div>

      {/* =========================================================
          PATHS
      ========================================================= */}
      <section className="container-page py-16">

        <p className="eyebrow">
          MADE FOR EVERYONE
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900">
          Choose your path
        </h2>

        <p className="mt-2 max-w-lg text-ink-500">
          A calm, clear experience for every person who
          makes shared living happen.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">

          <Path
            icon={<Search size={20} />}
            title="For guests"
            copy="Find and book a bed across a curated network of modern, welcoming shared spaces."
            to="/properties"
            action="Find a bed"
          />

          <Path
            icon={<Building2 size={20} />}
            title="For owners"
            copy="Manage beds, bookings, revenue and guest communication from one workspace."
            to="/owner"
            action="Open console"
          />

          <Path
            icon={<ShieldCheck size={20} />}
            title="For the ROOST team"
            copy="Keep a healthy network with partner checks and meaningful insight."
            to="/admin"
            action="Admin console"
          />

        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="border-y border-ink-100 bg-white py-14">

        <div className="container-page grid gap-6 sm:grid-cols-3">

          {[
            {
              quote:
                "Found a bed near work in ten minutes flat. Booking felt like it was made for actual humans.",
              name: "Sneha K.",
              city: "Pune",
            },
            {
              quote:
                "As an owner, I finally have one place to see every bed, every booking, every message.",
              name: "Amit P.",
              city: "Bengaluru",
            },
            {
              quote:
                "The QR check-in tool alone saved my front desk hours every week.",
              name: "Priya N.",
              city: "Hyderabad",
            },
          ].map((t, index) => (
            <figure
              key={t.name}
              className="
                roost-reveal
                card
                p-5
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-pop
              "
              style={{
                animationDelay: `${index * 0.12}s`,
              }}
            >
              <div className="mb-2 flex gap-0.5 text-sun-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-sun-500 transition-transform duration-300 hover:scale-125"
                  />
                ))}
              </div>

              <blockquote className="text-sm leading-relaxed text-ink-700">
                "{t.quote}"
              </blockquote>

              <figcaption className="mt-3 text-xs font-semibold text-ink-500">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}

/* =============================================================
   PATH CARD
============================================================= */

function Path({ icon, title, copy, to, action }) {
  return (
    <article
      className="
        card
        flex
        flex-col
        gap-3
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-pop
      "
    >
      <div
        className="
          grid
          h-11
          w-11
          place-items-center
          rounded-xl
          bg-brand-50
          text-brand-600
          transition-all
          duration-300
          hover:rotate-3
          hover:scale-110
        "
      >
        {icon}
      </div>

      <h3 className="text-base font-bold text-ink-900">
        {title}
      </h3>

      <p className="text-sm text-ink-500">
        {copy}
      </p>

      <Link
        to={to}
        className="
          btn-outline
          btn-sm
          mt-1
          w-fit
          transition-all
          duration-300
          hover:translate-x-1
        "
      >
        {action}

        <ChevronRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}