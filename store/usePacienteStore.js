import { create } from 'zustand';

const usePacienteStore = create((set) => ({
    paciente: {},
    setPaciente: (paciente) => set({ paciente }),
    setPacienteModule: (module, value) => set((state) => ({ paciente: { ...state.paciente, [module]: value } })),
}));

export default usePacienteStore;