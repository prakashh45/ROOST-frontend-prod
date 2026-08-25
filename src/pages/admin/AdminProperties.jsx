import { useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ManageTable from "../../components/owner/ManageTable";
import { useApi } from "../../hooks/useApi";
import { useAppState } from "../../context/AppStateContext";
import { propertyApi } from "../../api/services";
import { demoProperties } from "../../data/demo/properties";
import { adminNav } from "./nav";

export default function AdminProperties() {
  const { pushToast } = useAppState();
  const { data: properties, loading, error, setData } = useApi(
    () => propertyApi.list(),
    demoProperties,
    { transform: (d) => (Array.isArray(d) ? d : d.properties || demoProperties) }
  );

  const rows = useMemo(() => properties.map((p) => ({
    id: p.id, cols: [p.name, p.city, String(p.roomsCount ?? 6), String(p.bedsCount ?? 28), p.status || "ACTIVE"], raw: p,
  })), [properties]);

  const suspend = (row) => {
    setData((prev) => prev.map((p) => (p.id === row.raw.id ? { ...p, status: "MAINTENANCE" } : p)));
    pushToast({ type: "info", title: "Property flagged for review", message: row.raw.name });
  };

  return (
    <DashboardLayout nav={adminNav} title="Properties">
      <ManageTable
        title="All properties" subtitle="Every property listed on the ROOST network."
        headers={["Property", "City", "Rooms", "Beds", "Status"]}
        rows={rows} loading={loading} error={error} statusColumnIndex={4}
        onView={suspend} viewLabel="Flag"
        emptyTitle="No properties on the network yet"
      />
    </DashboardLayout>
  );
}
