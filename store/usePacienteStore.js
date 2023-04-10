import { create } from 'zustand';

const usePacienteStore = create((set) => ({
    paciente: {},
    barthelResults: {
        barthel: "No Aplica",
        puntuacion: "No Aplica",
        points: {}
    },
    setPaciente: (paciente) => set({ paciente }),
    setPacienteModule: (module, value) => set((state) => ({ paciente: { ...state.paciente, [module]: value } })),
    setBarthelResults: (barthelResults) => set((state) => ({ barthelResults: { ...state.paciente?.examenFisico?.barthel, ...barthelResults } })),
}));

export default usePacienteStore;