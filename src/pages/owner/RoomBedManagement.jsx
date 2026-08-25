import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ManageTable from "../../components/owner/ManageTable";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useApi } from "../../hooks/useApi";
import { useAppState } from "../../context/AppStateContext";
import { bedApi } from "../../api/services";
import { demoBeds } from "../../data/demo/properties";
import { ownerNav } from "./nav";

export default function RoomBedManagement() {
  const { pushToast } = useAppState();

  // IMPORTANT:
  // Backend room ID is numeric: "1"
  // NOT room number/code: "r101"
  const ROOM_ID = "1";
  const TENANT_ID = "1";

  const {
    data: beds,
    loading,
    error,
    setData,
  } = useApi(
    () => bedApi.list(ROOM_ID, { tenantId: TENANT_ID }),
    demoBeds,
    {
      transform: (response) => {
        if (Array.isArray(response)) {
          return response;
        }

        if (Array.isArray(response?.data)) {
          return response.data;
        }

        if (Array.isArray(response?.beds)) {
          return response.beds;
        }

        return [];
      },
    }
  );

  const [modal, setModal] = useState(null);

  const rows = useMemo(
    () =>
      (beds || []).map((b) => ({
        id: b.id,
        cols: [
          b.bedCode || b.id,
          "Roost Hostel",
          b.position || "-",
          `₹${b.priceOverride || 0}`,
          b.status || "AVAILABLE",
        ],
        raw: b,
      })),
    [beds]
  );

  const save = async (e) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (modal.mode === "add") {
        const payload = {
          tenantId: TENANT_ID,
          bedCode: values.bedCode,
          position: values.position,
          priceOverride:
            values.priceOverride !== ""
              ? Number(values.priceOverride)
              : null,
        };

        console.log("CREATE BED PAYLOAD:", payload);

        const response = await bedApi.create(ROOM_ID, payload);

        const createdBed = response?.data || response;

        setData((prev) => [createdBed, ...(prev || [])]);

        pushToast({
          type: "success",
          title: "Bed added",
          message: values.bedCode,
        });
      } else {
        const payload = {
          tenantId: TENANT_ID,
          bedCode: values.bedCode,
          position: values.position,
          priceOverride:
            values.priceOverride !== ""
              ? Number(values.priceOverride)
              : null,
          status: values.status,
        };

        console.log("UPDATE BED PAYLOAD:", payload);

        const response = await bedApi.update(
          modal.bed.id,
          payload
        );

        const updatedBed = response?.data || response;

        setData((prev) =>
          (prev || []).map((b) =>
            String(b.id) === String(modal.bed.id)
              ? updatedBed
              : b
          )
        );

        pushToast({
          type: "success",
          title: "Bed updated",
        });
      }

      setModal(null);
    } catch (err) {
      console.error("BED SAVE ERROR:", err);
      console.error(
        "BACKEND ERROR:",
        err?.response?.data
      );

      pushToast({
        type: "error",
        title: "Bed save failed",
        message:
          err?.response?.data?.message ||
          "Unable to save bed",
      });
    }
  };

  const remove = async (row) => {
    try {
      console.log("DELETING BED:", row.raw.id);

      await bedApi.remove(row.raw.id);

      setData((prev) =>
        (prev || []).filter(
          (b) => String(b.id) !== String(row.raw.id)
        )
      );

      pushToast({
        type: "success",
        title: "Bed removed",
        message: row.raw.bedCode || row.raw.id,
      });
    } catch (err) {
      console.error("BED DELETE ERROR:", err);
      console.error(
        "BACKEND ERROR:",
        err?.response?.data
      );

      pushToast({
        type: "error",
        title: "Bed delete failed",
        message:
          err?.response?.data?.message ||
          "Unable to delete bed",
      });
    }
  };

  

  return (
    <DashboardLayout nav={ownerNav} title="Rooms & beds">
      <ManageTable
        title="Manage rooms & beds"
        subtitle="Add rooms, configure beds and mark maintenance windows."
        addLabel="Add bed"
        onAdd={() => setModal({ mode: "add" })}
        headers={[
          "Room / bed",
          "Property",
          "Position",
          "Price",
          "Status",
        ]}
        rows={rows}
        loading={loading}
        error={error}
        statusColumnIndex={4}
        onEdit={(r) =>
          setModal({
            mode: "edit",
            bed: r.raw,
          })
        }
        onDelete={remove}
        emptyTitle="No beds yet"
      />

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={
          modal?.mode === "add"
            ? "Add bed"
            : "Edit bed"
        }
      >
        <form
          id="bed-form"
          onSubmit={save}
          className="grid gap-4"
        >
          <label className="field">
            <span className="label">Bed code</span>

            <input
              required
              name="bedCode"
              className="input"
              placeholder="e.g. 101-A"
              defaultValue={
                modal?.bed?.bedCode || ""
              }
            />
          </label>

          <label className="field">
            <span className="label">Position</span>

            <select
              name="position"
              className="input"
              defaultValue={
                modal?.bed?.position || "UPPER"
              }
            >
              <option value="UPPER">UPPER</option>
              <option value="LOWER">LOWER</option>
              <option value="SINGLE">SINGLE</option>
            </select>
          </label>

          <label className="field">
            <span className="label">
              Price / night
            </span>

            <input
              required
              type="number"
              name="priceOverride"
              className="input"
              min="0"
              defaultValue={
                modal?.bed?.priceOverride || ""
              }
            />
          </label>

          {modal?.mode === "edit" && (
            <label className="field">
              <span className="label">Status</span>

              <select
                name="status"
                className="input"
                defaultValue={
                  modal?.bed?.status ||
                  "AVAILABLE"
                }
              >
                <option value="AVAILABLE">
                  AVAILABLE
                </option>

                <option value="BOOKED">
                  BOOKED
                </option>

                <option value="MAINTENANCE">
                  MAINTENANCE
                </option>
              </select>
            </label>
          )}
        </form>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setModal(null)}
          >
            Cancel
          </Button>

          <Button
            variant="teal"
            size="sm"
            type="submit"
            form="bed-form"
          >
            Save bed
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}