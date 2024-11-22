import { ConfirmModal } from "@/components/modal";
import { useDeleteUser } from "@/lib/features/user/hooks/useDeleteUser";
import { closeModal, userDeleteModalSelectors } from "@/lib/store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export function UserDeleteModal() {
	const modalName="userDeleteModal"

	const dispatch = useDispatch();
	const { handleDeleteUser } = useDeleteUser()
	const modalState = useSelector(userDeleteModalSelectors.state)

	const isOpen = modalState?.isOpen

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	const handleConfirm = () => {
		if (modalState.data?.id) {
			handleDeleteUser.mutateAsync(modalState.data.id)
		}
	}

	return <ConfirmModal
		isOpen={isOpen}
		onClose={handleClose}
		onConfirm={handleConfirm}
		title={"Ви впевнені що хочете видалити користувача?"}
	/>
}