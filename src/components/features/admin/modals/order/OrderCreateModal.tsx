import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import { Input, SearchSelect, Modal } from "@/components";
import { useManageOrder } from "@/lib/features/order/hooks/useManageOrder";
import { clearModalErrors, closeModal } from "@/lib/store/slices/modalSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderCreateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { User } from "@/api/User/types";
import { ROLES } from "@/lib/constants/roles";

export function OrderCreateModal() {
	const modalName="orderCreateModal"

	const initialData = {
		customerId: "",
	}

	const { handleCreateOrder } = useManageOrder()
	const { handleGetAllUsers } = useGetUsers()

	const dispatch = useDispatch();
	const modalState = useSelector(orderCreateModalSelectors.state)
	const errors = useSelector(orderCreateModalSelectors.errors)

	const isOpen = modalState?.isOpen

	const [formData, setFormData] = useState(initialData);
	const [users, setUsers] = useState<User[] | []>([])
	const [query, setQuery] = useState('')
	const [selectedUser, setSelectedUser] = useState<User>()

	console.log('selectedUser', selectedUser);

	const userOptions = useMemo(() => {
		if (!users.length) return []

		return users.map(user => ({ value: user.phoneNumber, label: user.phoneNumber }))
	}, [users])

	useEffect(() => {
		fetchUsers()
	}, [query])

	 const fetchUsers = async () => {
		const fetchedUsers = await handleGetAllUsers.mutateAsync({ roles: [ROLES.CUSTOMER], phoneNumber: query })

		if (fetchedUsers) {
			setUsers(fetchedUsers.data)
			setSelectedUser(fetchedUsers.data.find(user => user.phoneNumber === query))
		}
	}

	const handleClose = () => {
		dispatch(closeModal(modalName))
		setFormData(initialData)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		dispatch(clearModalErrors('orderCreateModal'))
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const createData = {
			...formData,
		}
		handleCreateOrder.mutateAsync(createData)
	};

	return (
		<div>
			<Modal className="w-[1200px] max-w-[80vw]" isOpen={isOpen} onClose={handleClose} title={'Додати замовлення'}>
				<div>
					<SearchSelect
					    label={"Виберіть замовника"}
						options={userOptions}
						onChange={setQuery}
						placeholder={"Пошук замовника за телефоном"}
						className="w-[300px]"
					/>
				</div>
				<FormContainer onSubmit={handleSubmit} className="w-full" shadow="">
					<Input
						label="Назва"
						name="name"
						value={formData.customerId}
						onChange={handleChange}
						placeholder="Назва Тарифу"
						error={errors?.customerId}
					/>
					<ActionButton type="submit">{'Створити'}</ActionButton>
				</FormContainer>
			</Modal>
		</div>
	)
}