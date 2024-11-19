import { ConfirmModal } from "@/components/modal";
import { useDeleteTariff } from "@/lib/features/tariff/hooks/useDeleteTariff";
import { closeModal, tariffDeleteModalSelectors } from "@/lib/store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export function TariffDeleteModal() {
	const modalName="tariffDeleteModal"

	const dispatch = useDispatch();
	const { handleDeleteTariff } = useDeleteTariff()
	const modalState = useSelector(tariffDeleteModalSelectors.state)

	const isOpen = modalState?.isOpen

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	const handleConfirm = () => {
		if (modalState.data?.id) {
			handleDeleteTariff.mutateAsync(modalState.data.id)
		}
	}

	return <ConfirmModal
		isOpen={isOpen}
		onClose={handleClose}
		onConfirm={handleConfirm}
		title={"Ви впевнені що хочете видалити тариф?"}
	/>
}