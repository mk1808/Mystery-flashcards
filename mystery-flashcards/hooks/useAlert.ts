import { AlertType } from "@/enums/AlertType";
import useAlertStore from "@/stores/useAlertStore";
import useLocaleStore from "@/stores/useLocaleStore";
import { getNestedFieldByPath } from "@/utils/server/objectUtils";

function useAlert() {
    const addToStore = useAlertStore((state) => state.add)
    const { dictionary } = useLocaleStore(state => state);

    const addAlert = (type: string, message: string) => addToStore({ type: type, title: getNestedFieldByPath(dictionary, message) || message });
    const addSuccessAlert = (message: string) => addAlert(AlertType.success, message);
    const addWarningAlert = (message: string) => addAlert(AlertType.warning, message);
    const addErrorAlert = (message: string) => addAlert(AlertType.error, message);
    const addInfoAlert = (message: string) => addAlert(AlertType.info, message);

    return { addSuccessAlert, addWarningAlert, addErrorAlert, addInfoAlert };
}

export default useAlert