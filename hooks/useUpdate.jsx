import { updatePaciente } from "../services/axiosApi";
import useNotifyStore from "../store/useNotifyStore";
import usePacienteStore from "../store/usePacienteStore";

const useUpdate = () => {
    const { paciente, setPacienteModule } = usePacienteStore();
    const { setNotify, setBackdrop } = useNotifyStore();

    const update = async ({ module, data }) => {
        setBackdrop(true);

        const dataToSend = {
            pacienteId: paciente.datosBasicos.idUsuario,
            currentModuleData: paciente[module],
            newFormikValues: data
        }

        const { status, type, message } = await updatePaciente(dataToSend);
        setNotify({ type, message });
        setBackdrop(false);
        if (!status) return;

        setPacienteModule(module, data);
    }

    return update;
}

export default useUpdate;