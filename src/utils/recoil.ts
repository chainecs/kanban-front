// recoil.ts
import { atom } from "recoil";

export const ticketsState = atom({
  key: "ticketsState",
  default: [] as any[],
}); //for list all ticket

export const filterStatusState = atom({
  key: "filterStatus",
  default: {
    pending: true,
    accepted: true,
    rejected: true,
    resolved: true,
  },
});

export const sortOptionState = atom({
  key: "sortOption",
  default: "createDate",
});

export const catTicketsState = atom({
  key: "catTickets",
  default: { pending: [], accepted: [], resolved: [], rejected: [] },
});

export const isViewModalOpenState = atom({
  key: "isViewModalOpenState",
  default: false,
});

export const viewModalDataState = atom({
  key: "viewModalDataState",
  default: {},
});

export const isEditModalOpenState = atom({
  key: "isEditModalOpenState",
  default: false,
});

export const editModalDataState = atom({
  key: "editModalDataState",
  default: {},
});

export const isAddModalOpenState = atom({
  key: "isAddModalOpenState",
  default: false,
});
