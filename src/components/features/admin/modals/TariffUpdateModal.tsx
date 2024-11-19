import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import { Input } from "@/components/inputs";
import { Modal } from "@/components/modal";
import { useManageTariff } from "@/lib/features/tariff/hooks/useManageTariff";
import { clearModalErrors, closeModal, tariffUpdateModalSelectors } from "@/lib/store/slices/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function TariffUpdateModal() {
	const modalName="tariffUpdateModal"

	const { handleCreateTariff, handleUpdateTariff } = useManageTariff()

	const dispatch = useDispatch();
	const modalState = useSelector(tariffUpdateModalSelectors.state)
	const errors = useSelector(tariffUpdateModalSelectors.errors)

	const isOpen = modalState?.isOpen
	const isUpdateModal = !!modalState?.data?.id

	const [formData, setFormData] = useState({
		name: "",
		unitOfMeasurement: "",
		pricePerUnit: ""
	});

	useEffect(() => {
		if (modalState?.data && modalState?.data.type === 'tariffUpdateModal') {
			setFormData({
				name: modalState?.data?.name,
		        unitOfMeasurement: modalState?.data?.unitOfMeasurement,
		        pricePerUnit: modalState?.data?.pricePerUnit,
			})
		}
	}, [modalState?.data])

	const handleClose = () => {
		dispatch(closeModal(modalName))
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		dispatch(clearModalErrors('tariffUpdateModal'))
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isUpdateModal && modalState?.data?.id) {
			const updatedData = {
				...formData,
				id: modalState.data.id,
			}
			handleUpdateTariff.mutateAsync(updatedData)
		} else {
			const createData = {
				...formData,
			}
			handleCreateTariff.mutateAsync(createData)
		}
	};

	return (
		<div>
			<Modal  className="w-[40vw]" isOpen={isOpen} onClose={handleClose} title={isUpdateModal ? 'Змінити станцію' : 'Створити станцію'}>
				<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]" shadow="">
					<Input
						label="Назва"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Назва Тарифу"
						error={errors?.name}
					/>
					<Input
						label="Одиниця виміру"
						name="unitOfMeasurement"
						value={formData.unitOfMeasurement}
						onChange={handleChange}
						placeholder="Одиниця виміру"
						error={errors?.unitOfMeasurement}
					/>
					<Input
						label="Ціна за одиницю"
						name="pricePerUnit"
						value={formData.pricePerUnit}
						onChange={handleChange}
						placeholder="Ціна за одиницю"
						error={errors?.pricePerUnit}
					/>
					<ActionButton type="submit">{isUpdateModal ? 'Змінити' : 'Створити'}</ActionButton>
				</FormContainer>
			</Modal>
		</div>
	)
}