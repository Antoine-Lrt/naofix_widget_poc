import { Store, useStore } from "@tanstack/react-store";

// ------------------ TYPES ------------------

export interface ModalState<T = any> {
  isOpen: boolean;
  detail?: T;
  onConfirm?: () => void;
}

export interface ModalsStoreState {
  [modalId: string]: ModalState;
}

// ------------------ INITIAL STATE ------------------

const initialModalsState: ModalsStoreState = {};

// ------------------ STORE ------------------

export const modalsStore = new Store<ModalsStoreState>(initialModalsState);

// ------------------ ACTIONS ------------------

export const openModal = <T = any>(
  modalId: string,
  detail?: T,
  onConfirm?: () => void
) => {
  console.log("🚀 ~ modalStore.ts:30 ~ openModal ~ detail:", detail);

  modalsStore.setState((prev) => ({
    ...prev,
    [modalId]: { isOpen: true, detail, onConfirm },
  }));
};

export const closeModal = (modalId: string) => {
  modalsStore.setState((prev) => ({
    ...prev,
    [modalId]: { isOpen: false },
  }));
};

export const toggleModal = <T = any>(modalId: string, detail?: T) => {
  const modal = modalsStore.state[modalId];
  if (modal?.isOpen) {
    closeModal(modalId);
  } else {
    openModal(modalId, detail);
  }
};

// ------------------ HOOKS ------------------

export const useModal = <T = any>(modalId: string) => {
  const modal = useStore(
    modalsStore,
    (state) => state[modalId] ?? { isOpen: false }
  );

  return {
    isOpen: modal.isOpen,
    detail: modal.detail as T | undefined,
    onConfirm: modal.onConfirm,
    open: (detail?: T, onConfirm?: () => void) =>
      openModal(modalId, detail, onConfirm),
    close: () => closeModal(modalId),
    toggle: (detail?: T) => toggleModal(modalId, detail),
  };
};
