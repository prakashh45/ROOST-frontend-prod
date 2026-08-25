import client from "./client";

// ==============================
// AUTH
// ==============================

export const authApi = {
  login: (data) =>
    client.post("/auth/login", data).then((r) => r.data),

  register: (data) =>
    client.post("/auth/register", data).then((r) => r.data),

  me: () =>
    client.get("/auth/me").then((r) => r.data),
};


// ==============================
// PROPERTIES
// ==============================

export const propertyApi = {
  list: (params) =>
    client.get("/properties", { params }).then((r) => r.data),

  get: (slug) =>
    client.get(`/properties/${slug}`).then((r) => r.data),

  create: (payload) =>
    client.post("/properties", payload).then((r) => r.data),

  update: (id, payload) =>
    client.patch(`/properties/${id}`, payload).then((r) => r.data),

  remove: (id) =>
    client.delete(`/properties/${id}`).then((r) => r.data),

  availability: (slug, params) =>
    client
      .get(`/properties/${slug}/availability`, { params })
      .then((r) => r.data),

  mine: () =>
    client.get("/properties/mine").then((r) => r.data),
};


// ==============================
// ROOMS
// ==============================

export const roomApi = {
  list: (propertyId) =>
    client
      .get(`/properties/${propertyId}/rooms`)
      .then((r) => r.data),

  create: (propertyId, payload) =>
    client
      .post(`/properties/${propertyId}/rooms`, payload)
      .then((r) => r.data),

  update: (roomId, payload) =>
    client
      .patch(`/rooms/${roomId}`, payload)
      .then((r) => r.data),

  remove: (roomId) =>
    client
      .delete(`/rooms/${roomId}`)
      .then((r) => r.data),
};


// ==============================
// BEDS
// ==============================
export const bedApi = {
  list: (roomId, { tenantId } = {}) => {
    console.log("BED LIST:", roomId, tenantId);

    return client
      .get(`/rooms/${roomId}/beds`, {
        params: {
          tenantId,
        },
      })
      .then((r) => r.data);
  },

  create: (roomId, payload) =>
    client
      .post(`/rooms/${roomId}/beds`, payload)
      .then((r) => r.data),

  update: (bedId, payload) =>
    client
      .patch(`/beds/${bedId}`, payload)
      .then((r) => r.data),

  remove: (bedId, params = {}) =>
    client
      .delete(`/beds/${bedId}`, { params })
      .then((r) => r.data),
};
// ==============================
// BOOKINGS
// ==============================

export const bookingApi = {
  create: (payload) =>
    client
      .post("/bookings", payload)
      .then((r) => r.data),

  list: (params) =>
    client
      .get("/bookings", { params })
      .then((r) => r.data),

  get: (code) =>
    client
      .get(`/bookings/${code}`)
      .then((r) => r.data),

  update: (code, action, payload = {}) =>
    client
      .patch(`/bookings/${code}/${action}`, payload)
      .then((r) => r.data),

  ownerList: (params) =>
    client
      .get("/bookings/owner", { params })
      .then((r) => r.data),
};


// ==============================
// CHAT
// ==============================

export const chatApi = {
  conversations: () =>
    client
      .get("/chat/conversations")
      .then((r) => r.data),

  messages: (conversationId) =>
    client
      .get(`/chat/conversations/${conversationId}/messages`)
      .then((r) => r.data),

  send: (conversationId, payload) =>
    client
      .post(
        `/chat/conversations/${conversationId}/messages`,
        payload
      )
      .then((r) => r.data),
};


// ==============================
// NOTIFICATIONS
// ==============================

export const notificationApi = {
  list: () =>
    client
      .get("/notifications")
      .then((r) => r.data),

  markRead: (id) =>
    client
      .patch(`/notifications/${id}/read`)
      .then((r) => r.data),
};


// ==============================
// ANALYTICS
// ==============================

export const analyticsApi = {
  ownerSummary: () =>
    client
      .get("/analytics/owner-summary")
      .then((r) => r.data),

  adminSummary: () =>
    client
      .get("/analytics/admin-summary")
      .then((r) => r.data),
};


// ==============================
// FAVORITES
// ==============================

export const favoriteApi = {
  list: () =>
    client
      .get("/favorites")
      .then((r) => r.data),

  add: (propertyId) =>
    client
      .post("/favorites", { propertyId })
      .then((r) => r.data),

  remove: (propertyId) =>
    client
      .delete(`/favorites/${propertyId}`)
      .then((r) => r.data),
};


// ==============================
// HEALTH
// ==============================

export const healthApi = {
  ping: () =>
    client
      .get("/health", { timeout: 6000 })
      .then((r) => r.data),
};