import { create } from 'zustand';

const useNotifyStore = create((set) => ({
    open: false,
    type: '',
    message: '',
    backdrop: false,
    setNotify: ({ open = true, type, message }) => {
        set({ open, type, message });
    },
    setBackdrop: (backdrop) => {
        set({ backdrop });
    }
}));

export default useNotifyStore;