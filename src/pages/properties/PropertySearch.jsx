import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import PropertyCard from "../../components/property/PropertyCard";
import FilterSidebar from "../../components/property/FilterSidebar";
import { CardSkeleton } from "../../components/ui/LoadingState";
import EmptyState from "../../components/ui/EmptyState";
import ApiNotice from "../../components/ui/ApiNotice";
import { useApi } from "../../hooks/useApi";
import { useAppState } from "../../context/AppStateContext";
import { propertyApi } from "../../api/services";
import { demoProperties } from "../../data/demo/properties";

export default function PropertySearch() {
  const [params] = useSearchParams();
  const { favorites, toggleFavorite } = useAppState();
  const [sort, setSort] = useState("recommended");
  const [activeFilters, setActiveFilters] = useState([]);

  const { data: items, loading, error } = useApi(
    () => propertyApi.list({ city: params.get("city") }),
    demoProperties,
    { deps: [params.get("city")], transform: (d) => (Array.isArray(d) ? d : d.properties || demoProperties) }
  );

  const list = useMemo(() => [...items].sort((a, b) => {
    if (sort === "low") return (a.price || 0) - (b.price || 0);
    if (sort === "high") return (b.price || 0) - (a.price || 0);
    return 0;
  }), [items, sort]);

  const toggleFilter = (f) => setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  return (
    <>
      <Navbar />
      <header className="border-b border-ink-100 bg-white py-8">
        <div className="container-page">
          <p className="text-xs font-semibold text-ink-400">Home / Find a bed</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">
            Find your next bed{params.get("city") ? ` in ${params.get("city")}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink-500">Thoughtfully managed spaces made for the way you live.</p>
        </div>
      </header>

      <main className="container-page grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <FilterSidebar filters={activeFilters} onToggle={toggleFilter} />
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <b className="text-sm text-ink-700">{loading ? "Finding places…" : `${list.length} places to stay`}</b>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto py-2 text-sm">
              <option value="recommended">Sort: Recommended</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>

          <ApiNotice message={error} />

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((x) => <CardSkeleton key={x} className="h-64" />)}
            </div>
          ) : list.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <PropertyCard key={p.slug || p.id} property={p} favorite={favorites.includes(p.slug)} onFavorite={() => toggleFavorite(p.slug)} />
              ))}
            </div>
          ) : (
            <EmptyState title="No properties match your search" body="Try a different city or clear your filters." />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
