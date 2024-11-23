import { dumpCreateUser, dumpUpdateUser } from "@/api/User/userDump";
import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import { Input } from "@/components/inputs";
import { Modal } from "@/components/modal";
import { useManageUser } from "@/lib/features/user/hooks/useManageUser";
import { clearModalErrors, closeModal } from "@/lib/store/slices/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoleSelect } from "@/components";
import { userUpdateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { userSelectors } from "@/lib/store/selectors/userSelectors";

export function UserUpdateModal() {
	const modalName="userUpdateModal"

	const initialData = {
		name: "",
		phoneNumber: "",
		notes: "",
		city: "",
		street: "",
		building: "",
		flat: "",
		entrance: "",
		addressNotes: "",
		role: 'customer'
	}

	const { handleCreateUser, handleUpdateUser } = useManageUser()

	const dispatch = useDispatch();
	const modalState = useSelector(userUpdateModalSelectors.state)
	const errors = useSelector(userUpdateModalSelectors.errors)

	const userRole = useSelector(userSelectors.role)
	const isSuperAdmin = userRole === 'superadmin'

	const isOpen = modalState?.isOpen
	const isUpdateModal = !!modalState?.data?.id

	const [formData, setFormData] = useState(initialData);

	useEffect(() => {
		if (modalState?.data && modalState?.data.type === modalName) {
			setFormData({
				name: modalState?.data?.name || '',
		        phoneNumber: modalState?.data?.phoneNumber || '',
		        notes: modalState?.data?.notes || '',
				city: modalState?.data?.city || '',
				street: modalState?.data?.street || '',
				building: modalState?.data?.building || '',
				flat: modalState?.data?.flat || '',
				entrance: modalState?.data?.entrance || '',
				addressNotes: modalState?.data?.addressNotes || '',
				role: modalState?.data?.role || 'customer'
			})
		}
	}, [modalState?.data])

	const handleClose = () => {
		dispatch(closeModal(modalName))
		setFormData(initialData)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({ ...prevData, [name]: value }));
		dispatch(clearModalErrors(modalName))
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isUpdateModal && modalState?.data?.id) {
			const updatedData = {
				...formData,
				id: modalState.data.id,
			}
			handleUpdateUser.mutateAsync(dumpUpdateUser(updatedData))
		} else {
			const createData = {
				...formData,
			}
			handleCreateUser.mutateAsync(dumpCreateUser(createData))
		}
	};

	return (
		<div>
			<Modal  className="w-[1000px] max-w-[80vw]" isOpen={isOpen} onClose={handleClose} title={isUpdateModal ? 'Змінити користувача' : 'Створити користувача'}>
				<FormContainer onSubmit={handleSubmit} className="w-full" shadow="">
					<div className="flex gap-5 justify-between">
						<div className="flex flex-col gap-5 w-full">
							<Input
								label="Ім'я"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Ім'я користувача"
								error={errors?.name}
							/>
							<Input
								label="Номер телефону"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleChange}
								placeholder="Номер телефону"
								error={errors?.phoneNumber}
							/>
							<Input
								label="Примітки"
								name="notes"
								value={formData.notes}
								onChange={handleChange}
								placeholder="Примітки користувача"
								error={errors?.notes}
							/>
							{isSuperAdmin && <RoleSelect
							    value={formData.role}
								onChange={handleChange}
							/>}
						</div>
						<div className="min-h-full w-[1px] border"></div>
						<div className="flex flex-col gap-5 w-full">
							<Input
								label="Місто"
								name="city"
								value={formData.city}
								onChange={handleChange}
								placeholder="Місто"
								error={errors?.city}
							/>
							<Input
								label="Вулиця"
								name="street"
								value={formData.street}
								onChange={handleChange}
								placeholder="Вулиця"
								error={errors?.street}
							/>
							<Input
								label="Будинок"
								name="building"
								value={formData.building}
								onChange={handleChange}
								placeholder="Номер будинку"
								error={errors?.building}
							/>
							<Input
								label="Квартира"
								name="flat"
								value={formData.flat}
								onChange={handleChange}
								placeholder="Номер квартири"
								error={errors?.flat}
							/>
							<Input
								label="Під'їзд"
								name="entrance"
								value={formData.entrance}
								onChange={handleChange}
								placeholder="Номер під'їзду"
								error={errors?.entrance}
							/>
							<Input
								label="Примітки"
								name="addressNotes"
								value={formData.addressNotes}
								onChange={handleChange}
								placeholder="Примітки адреси"
								error={errors?.addressNotes}
							/>
						</div>
					</div>
					<ActionButton type="submit">{isUpdateModal ? 'Змінити' : 'Створити'}</ActionButton>
				</FormContainer>
			</Modal>
		</div>
	)
}
