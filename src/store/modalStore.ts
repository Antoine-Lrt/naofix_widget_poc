import { Store, useStore } from "@tanstack/react-store";

// ------------------ TYPES ------------------

export interface ModalState<T = any> {
  isOpen: boolean;
  detail?: T;
}

export interface ModalsStoreState {
  [modalId: string]: ModalState;
}

// ------------------ INITIAL STATE ------------------

const initialModalsState: ModalsStoreState = {};

// ------------------ STORE ------------------

export const modalsStore = new Store<ModalsStoreState>(initialModalsState);

// ------------------ ACTIONS ------------------

export const openModal = <T = any>(modalId: string, detail?: T) => {
  modalsStore.setState((prev) => ({
    ...prev,
    [modalId]: { isOpen: true, detail },
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
    open: (detail?: T) => openModal(modalId, detail),
    close: () => closeModal(modalId),
    toggle: (detail?: T) => toggleModal(modalId, detail),
  };
};
