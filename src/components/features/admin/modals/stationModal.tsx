import { Modal } from "@/components/modal";
import { closeModal, ModalState } from "@/lib/store/slices/modalSlice";
import { RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";

export function StationModal() {
	const modalName="stationModal"

	const dispatch = useDispatch();
	const modalState = useSelector((state: RootState) => state.modal?.[modalName])
	
	const isOpen = modalState.isOpen

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} title={"Створити/оновити станцію"}>
				Оновити станцію
				<div>{modalState?.data?.name}</div>
				<div>{modalState?.data?.location}</div>
			</Modal>
		</>
	)
}