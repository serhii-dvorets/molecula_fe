import { ConfirmModal } from "@/components/modal";
import { useDeleteStation } from "@/lib/features/station/hooks/useDeleteStation";
import { closeModal, stationDeleteSelectors } from "@/lib/store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export function StationDeleteModal() {
	const modalName="stationDeleteModal"

	const dispatch = useDispatch();
	const { handleDeleteStation } = useDeleteStation()
	const modalState = useSelector(stationDeleteSelectors.state)

	const isOpen = modalState?.isOpen

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	const handleConfirm = () => {
		if (modalState.data?.id) {
			handleDeleteStation.mutateAsync(modalState.data.id)
		}
	}

	return <ConfirmModal
		isOpen={isOpen}
		onClose={handleClose}
		onConfirm={handleConfirm}
		title={"Ви впевнені що хочете видалити станцію?"}
	/>
}