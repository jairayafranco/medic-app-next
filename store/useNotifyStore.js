import { create } from 'zustand';

const useNotifyStore = create((set) => ({
    open: false,
    type: '',
    message: '',
    backdrop: false,
    setNotify: ({ type, message }) => {
        set({ open: true, type, message });
    },
    setBackdrop: (backdrop) => {
        set({ backdrop });
    }
}));

export default useNotifyStore;