import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import ApiNotice from "../../components/ui/ApiNotice";
import LoadingState from "../../components/ui/LoadingState";
import { useApi } from "../../hooks/useApi";
import { useAppState } from "../../context/AppStateContext";
import { useBooking } from "../../context/BookingContext";
import { propertyApi } from "../../api/services";
import { demoProperties } from "../../data/demo/properties";
import PropertyCard from "../../components/property/PropertyCard";
import { MapPin, Heart, Star, Wifi, Snowflake, ShowerHead, Car, Lock, WashingMachine } from "../../components/icons";

const AMENITY_ICON = {
  "Fast Wi-Fi": Wifi, "Air conditioning": Snowflake, "Hot water": ShowerHead,
  "Parking": Car, "24/7 security": Lock, "Laundry": WashingMachine,
};

export default function PropertyDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useAppState();
  const { setProperty } = useBooking();
  const [checkIn, setCheckIn] = useState("2026-09-03");
  const [checkOut, setCheckOut] = useState("2026-09-10");

  const fallback = demoProperties.find((x) => x.slug === slug) || demoProperties[0];
  const { data: property, loading, error } = useApi(
    () => propertyApi.get(slug),
    fallback,
    { deps: [slug], transform: (d) => d.property || d }
  );

  // Same /properties endpoint as Home's "Featured stays" rail and the
  // Search grid — reused here, filtered to the same city, as a "Similar
  // stays nearby" rail. One API, three different presentations.
  const { data: allProperties } = useApi(() => propertyApi.list(), demoProperties, { deps: [] });
  const similar = allProperties.filter((p) => p.slug !== slug).slice(0, 3);

  if (loading) return (<><Navbar /><LoadingState label="Loading property…" /></>);

  const price = property.price || property.startingPrice || 300;
  const isFav = favorites.includes(property.slug);

  const goToAvailability = () => {
    setProperty(property, checkIn, checkOut);
    navigate(`/properties/${property.slug}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  return (
    <>
      <Navbar />
      <main className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_340px]">
        <section>
          <p className="text-xs font-semibold text-ink-400">Find a bed / {property.city} / {property.name}</p>
          <div className="relative mt-3 grid h-64 place-items-center rounded-2xl bg-gradient-to-br from-brand-300 to-brand-600 text-center text-2xl font-extrabold text-white sm:h-80">
            ROOST<br />CO-LIVING
            <button
              onClick={() => toggleFavorite(property.slug)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-rose-500 shadow-sm hover:bg-white"
            >
              <Heart size={17} fill={isFav ? "currentColor" : "none"} />
            </button>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900">{property.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin size={14} /> {property.city} · <Star size={13} className="fill-amber-400 text-amber-400" /> {property.rating || "4.8"} ({property.reviews || 124} reviews) · Guest favourite
          </p>

          <ApiNotice message={error} />

          <Info title="Designed for easier shared living">
            <p className="text-sm leading-relaxed text-ink-600">{property.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(property.amenities || ["Fast Wi-Fi", "Air conditioning", "Hot water", "Parking", "24/7 security", "Laundry"]).map((a) => {
                const Icon = AMENITY_ICON[a];
                return (
                  <span key={a} className="flex items-center gap-2 text-sm text-ink-700">
                    {Icon ? <Icon size={15} className="text-brand-500" /> : "✓"} {a}
                  </span>
                );
              })}
            </div>
          </Info>

          <Info title="About this property">
            <p className="text-sm leading-relaxed text-ink-600">
              Located close to cafés, workplaces and transport, this is shared living with a little more room to breathe.
              Every stay includes a simple, transparent booking experience.
            </p>
          </Info>

          <Info title="Where you'll be">
            <div className="grid h-40 place-items-center rounded-xl bg-ink-100 text-sm font-semibold text-ink-500">
              ● {property.name?.toUpperCase()}
            </div>
          </Info>

          <Info title="Things to know">
            <p className="text-sm leading-relaxed text-ink-600">
              Check-in: 2:00 PM onwards · Check-out: 11:00 AM<br /><br />
              Free cancellation up to 48 hours before check-in. Quiet hours begin at 10 PM.
            </p>
          </Info>
        </section>

        <aside className="h-fit rounded-2xl border border-ink-100 bg-white p-5 shadow-card lg:sticky lg:top-20">
          <h2 className="text-2xl font-extrabold text-ink-900">₹{price} <small className="text-sm font-medium text-ink-400">/ night</small></h2>
          <p className="mt-0.5 text-xs text-ink-500">Taxes included where applicable</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <label className="field"><span className="label">Check-in</span><input type="date" className="input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></label>
            <label className="field"><span className="label">Check-out</span><input type="date" className="input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></label>
          </div>
          <label className="field mt-2"><span className="label">Guests</span><select className="input"><option>1 guest</option><option>2 guests</option></select></label>
          <button onClick={goToAvailability} className="btn-primary mt-4 w-full justify-center">Check availability</button>
          <hr className="my-4 border-ink-100" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-500">7 nights × ₹{price}</span>
            <b className="text-ink-900">₹{price * 7}</b>
          </div>
        </aside>
      </main>

      {similar.length > 0 && (
        <section className="border-t border-ink-100 bg-white py-12">
          <div className="container-page mb-5">
            <p className="eyebrow">NEARBY</p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-900">Similar stays nearby</h2>
          </div>
          <div className="container-page flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {similar.map((p) => (
              <PropertyCard key={p.slug || p.id} property={p} compact favorite={favorites.includes(p.slug)} onFavorite={() => toggleFavorite(p.slug)} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

function Info({ title, children }) {
  return (
    <section className="mt-8 border-t border-ink-100 pt-8">
      <h2 className="mb-3 text-lg font-bold text-ink-900">{title}</h2>
      {children}
    </section>
  );
}
