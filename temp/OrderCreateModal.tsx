import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import { SearchSelect, Modal, HorizontalDivider, Input } from "@/components";
import { useManageOrder } from "@/lib/features/order/hooks/useManageOrder";
import { clearModalErrors, closeModal } from "@/lib/store/slices/modalSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderCreateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { User } from "@/api/User/types";
import { ROLES } from "@/lib/constants/roles";
import { Order } from "@/api/Order/types";
import apiSingleton from "@/api/ApiFactory";
import FormContainer from "@/components/forms/FormContainer";
import { OrderItemTypeSelect } from "../../selects";

type Props = {
	handleCreateUser: () => void;
	setCreatedUser: (data: User | undefined) => void;
	createdUser?: User
}

export function OrderCreateModal({ handleCreateUser, setCreatedUser, createdUser }: Props) {
	const modalName="orderCreateModal"

	const initialData = {
		type: 'carpet',
		tariff: '',
		quantity: '',
		price: ''
	}

	const { handleCreateOrder } = useManageOrder()
	const { handleGetAllUsers } = useGetUsers()

	const dispatch = useDispatch();
	const modalState = useSelector(orderCreateModalSelectors.state)

	const isOpen = modalState?.isOpen

	const [formData, setFormData] = useState(initialData);
	const [users, setUsers] = useState<User[] | []>([])
	const [query, setQuery] = useState('')
	const [selectedUser, setSelectedUser] = useState<User>()
	const [createdOrder, setCreatedOrder] = useState<Order>()
	const [orderItems, setOrderItems] = useState([])

	const userOptions = useMemo(() => {
		if (!users.length) return []

		return users.map(user => ({ value: user.phoneNumber, label: user.phoneNumber }))
	}, [users])

	const createOrder = async () => {
		if (selectedUser && selectedUser.id) {
			const data = await apiSingleton.order.create({ customerId: selectedUser.id })

			setCreatedOrder(data)
		}
	}

	const updateOrder = async () => {
		if (selectedUser?.id && createdOrder?.id) {
			const data = await apiSingleton.order.update(createdOrder.id, {
				customerId: selectedUser.id
			})

			setCreatedOrder(data)
		}
	}

	useEffect(() => {
		setSelectedUser(createdUser);
		if (createdUser?.phoneNumber) {
			setQuery(createdUser.phoneNumber);
		}
	}, [createdUser])

	useEffect(() => {
		fetchUsers()
	}, [query])

	useEffect(() => {
		if (!createdOrder) {
			createOrder()
		} else {
			updateOrder()
		}
	}, [selectedUser])

	 const fetchUsers = async () => {
		const fetchedUsers = await handleGetAllUsers.mutateAsync({ roles: [ROLES.CUSTOMER], phoneNumber: query })

		if (fetchedUsers) {
			setUsers(fetchedUsers.data)
			setSelectedUser(fetchedUsers.data.find(user => user.phoneNumber === query))
		}
	}

	const handleDeleteUnfinishedOrder = async () => {
		if (createdOrder?.id) {
			await apiSingleton.order.delete(createdOrder.id)
		}
	}

	const handleClose = () => {
		dispatch(closeModal(modalName))
		setFormData(initialData)
		setCreatedUser(undefined)
		handleDeleteUnfinishedOrder()
		setSelectedUser(undefined)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
		<Modal
			className="min-w-[80vw] modal flex flex-col p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto"
			isOpen={isOpen}
			onClose={handleClose}
			title={'Додати замовлення'}
		>
			<div className="flex justify-between gap-10">
				<div className="w-full">
					<div className="flex items-center gap-2">
						<SearchSelect
					        label={"Виберіть замовника"}
							options={userOptions}
							onChange={setQuery}
							placeholder={"Пошук замовника за телефоном"}
						/>
						<ActionButton className="w-[250px] self-end mb-6" type='button' onClick={handleCreateUser}>{'Новий замовник'}</ActionButton>
					</div>
					<div className="flex gap-2">
						<OrderItemTypeSelect
							value={formData.type}
							onChange={handleChange}
							disabled={!selectedUser}
							className="w-full"
						/>
						<ActionButton type="button" className="w-[245px] self-end mb-[2px]">{'Створити'}</ActionButton>
					</div>
				</div>
				<div className="w-full">
					<div className="customer-block mb-6">
						<div className="flex flex-col gap-4 customer-info mt-4 p-4 border rounded bg-gray-50">
							<p className="flex w-full justify-between"><strong>{`Ім'я: `}</strong>{selectedUser?.name || ' - '}</p>
							<p className="flex w-full justify-between"><strong>{'Телефон: '}</strong>{selectedUser?.phoneNumber || ' - '}</p>
							<HorizontalDivider />
							<p className="flex w-full justify-between"><strong>{'Місто: '}</strong>{selectedUser?.address?.city || ' - '}</p>
							<p className="flex w-full justify-between"><strong>{'Вулиця: '}</strong>{selectedUser?.address?.street || ' - '}</p>
							<p className="flex w-full justify-between"><strong>{'Будинок: '}</strong>{selectedUser?.address?.building || ' - '}</p>
							<p className="flex w-full justify-between"><strong>{'Квартира: '}</strong>{selectedUser?.address?.flat || ' - '}</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

