import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import TextInput from "@/components/inputs/TextInput";
import { Modal } from "@/components/modal";
import { useManageStation } from "@/lib/features/station/hooks/useManageStation";
import { clearModalErrors, closeModal, stationModalSelectors } from "@/lib/store/slices/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function StationUpdateModal() {
	const modalName="stationUpdateModal"

	const { handleCreateStation, handleUpdateStation } = useManageStation()

	const dispatch = useDispatch();
	const modalState = useSelector(stationModalSelectors.state)
	const errors = useSelector(stationModalSelectors.errors)

	const isOpen = modalState?.isOpen
	const isUpdateModal = !!modalState?.data?.id

	const [formData, setFormData] = useState({
		name: "",
		location: ""
	});

	useEffect(() => {
		if (modalState?.data && modalState?.data.type === 'stationUpdateModal') {
			setFormData({
				name: modalState?.data?.name,
		        location: modalState?.data?.location
			})
		}
	}, [modalState])

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearModalErrors('stationUpdateModal'))
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isUpdateModal && modalState?.data?.id) {
			const updatedData = {
				...formData,
				id: modalState.data.id,
				postIds: [],
				employeeIds: []
			}
			handleUpdateStation.mutateAsync(updatedData)
		} else {
			const createData = {
				...formData,
				postIds: [],
				employeeIds: []
			}
			handleCreateStation.mutateAsync(createData)
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} title={isUpdateModal ? 'Змінити станцію' : 'Створити станцію'}>
				<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]" shadow="">
					<TextInput
						label="Назва"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Назва станції"
						error={errors?.name}
					/>
					<TextInput
						label="Локація"
						name="location"
						value={formData.location}
						onChange={handleChange}
						placeholder="Локація станції"
						error={errors?.location}
					/>
					<ActionButton type="submit">{isUpdateModal ? 'Змінити' : 'Створити'}</ActionButton>
				</FormContainer>
			</Modal>
		</>
	)
}