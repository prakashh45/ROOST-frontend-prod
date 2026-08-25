import { createContext, useContext, useMemo, useState, useCallback } from "react";

const BookingContext = createContext(null);

const EMPTY_DRAFT = {
  property: null,
  bed: null,
  checkIn: "",
  checkOut: "",
  guests: 1,
  guestDetails: null,
  bookingResult: null,
};

/**
 * Carries the in-progress booking (property -> bed -> guest details ->
 * review -> success) across route changes so each step is driven by real
 * selections instead of hard-coded copy.
 */
export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const setProperty = useCallback((property, checkIn, checkOut) => {
    setDraft((d) => ({ ...d, property, checkIn: checkIn || d.checkIn, checkOut: checkOut || d.checkOut }));
  }, []);

  const setBed = useCallback((bed) => setDraft((d) => ({ ...d, bed })), []);
  const setGuestDetails = useCallback((guestDetails) => setDraft((d) => ({ ...d, guestDetails })), []);
  const setBookingResult = useCallback((bookingResult) => setDraft((d) => ({ ...d, bookingResult })), []);
  const reset = useCallback(() => setDraft(EMPTY_DRAFT), []);

  const nights = useMemo(() => {
    if (!draft.checkIn || !draft.checkOut) return 7;
    const ms = new Date(draft.checkOut) - new Date(draft.checkIn);
    const n = Math.round(ms / 86400000);
    return n > 0 ? n : 7;
  }, [draft.checkIn, draft.checkOut]);

  const value = useMemo(
    () => ({ draft, setProperty, setBed, setGuestDetails, setBookingResult, reset, nights }),
    [draft, setProperty, setBed, setGuestDetails, setBookingResult, reset, nights]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
