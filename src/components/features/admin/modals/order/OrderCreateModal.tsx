import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import { SearchSelect, Modal, HorizontalDivider, Input } from "@/components";
import { useManageOrder } from "@/lib/features/order/hooks/useManageOrder";
import { closeModal } from "@/lib/store/slices/modalSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderCreateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { User } from "@/api/User/types";
import { ROLES } from "@/lib/constants/roles";
import { Order, OrderStatus } from "@/api/Order/types";
import apiSingleton from "@/api/ApiFactory";
import { OrderItemTypeSelect } from "../../selects";
import { PencilIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { OrderItemType } from "@/api/OrderItem/types";
import { useGetTariffs } from "@/lib/features/tariff/hooks/useGetTariffs";
import { Tariff } from "@/api/Tariff/types";

type Props = {
	handleCreateUser: () => void;
	setCreatedUser: (data: User | undefined) => void;
	createdUser?: User;
}

type OrderItem = {
	type: OrderItemType,
	label: string,
	quantity: number,
	price: string
	name: string
	value: string
}

export function OrderCreateModal({ handleCreateUser, setCreatedUser, createdUser }: Props) {
	const modalName = "orderCreateModal";

	const { handleGetAllTariffs } = useGetTariffs();
	const { handleCreateOrder } = useManageOrder();
	const { handleGetAllUsers } = useGetUsers();
	const dispatch = useDispatch();
	const modalState = useSelector(orderCreateModalSelectors.state);
	const isOpen = modalState?.isOpen;

	const defaultOrderItem = {
		type: 'carpet' as OrderItemType,
		label: 'Килим',
		quantity: 1,
		price: '',
		name: '',
		value: ''
	}

	const [users, setUsers] = useState<User[] | []>([]);
	const [query, setQuery] = useState('');
	const [tariffs, setTariffs] = useState<Tariff[]>();
	const [selectedUser, setSelectedUser] = useState<User>();
	const [createdOrder, setCreatedOrder] = useState<Order>();
	const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
	const [currentOrderItem, setCurrentOrderItem] = useState<OrderItem>(defaultOrderItem);
	const [mode, setMode] = useState<{type: 'update' | 'set', index: number | undefined}>({ type: 'set', index: undefined })

	const deliveryTariffData = tariffs?.find(tariff => tariff.name === 'Доставка по місту')
	const deliveryTariff = deliveryTariffData?.pricePerUnit || String(0)

	const userOptions = useMemo(() => {
		if (!users.length) return [];
		return users.map(user => ({ value: user.phoneNumber, label: user.phoneNumber }));
	}, [users]);

	const createOrder = async () => {
		if (selectedUser && selectedUser.id) {
			const data = await apiSingleton.order.create({ customerId: selectedUser.id });
			setCreatedOrder(data);
		}
	};

	const updateOrder = async () => {
		if (selectedUser?.id && createdOrder?.id) {
			const data = await apiSingleton.order.update(createdOrder.id, {
				id: createdOrder.id,
				customerId: selectedUser.id
			});
			setCreatedOrder(data);
		}
	};

	const fetchTariffs = async () => {
		const tariffs = await handleGetAllTariffs.mutateAsync()
		if (tariffs) setTariffs(tariffs)
	}

	useEffect(() => {
		fetchTariffs() 
	}, [])

	useEffect(() => {
		setSelectedUser(createdUser);
		if (createdUser?.phoneNumber) {
			setQuery(createdUser.phoneNumber);
		}
	}, [createdUser]);

	useEffect(() => {
		fetchUsers();
	}, [query]);

	useEffect(() => {
		if (!createdOrder) {
			createOrder();
		} else {
			updateOrder();
		}
	}, [selectedUser]);

	const fetchUsers = async () => {
		const fetchedUsers = await handleGetAllUsers.mutateAsync({ roles: [ROLES.CUSTOMER], phoneNumber: query });
		if (fetchedUsers) {
			setUsers(fetchedUsers.data);
			setSelectedUser(fetchedUsers.data.find(user => user.phoneNumber === query));
		}
	};

	const handleDeleteUnfinishedOrder = async () => {
		if (createdOrder?.id) {
			await apiSingleton.order.delete(createdOrder.id);
		}
	};

	const handleClose = () => {
		dispatch(closeModal(modalName));
		setCreatedUser(undefined);
		handleDeleteUnfinishedOrder();
		setSelectedUser(undefined);
	};

	const handleSubmitOrderItem = () => {
		if (currentOrderItem) {
			if (mode.type === 'set') {
				setOrderItems(prev => [...prev, currentOrderItem])
			} else {
				const updatedItems = orderItems.map((item, index) => {
					if (index !== mode.index) return item

					return currentOrderItem
				})
				setOrderItems(updatedItems)
			}
		}
		setCurrentOrderItem(defaultOrderItem)
		setMode({ type: 'set', index: 0 })
	}

	const handleRemoveOrderItem = (index: number) => {
		const updatedItems = orderItems.filter((_, i) => i !== index);
		setOrderItems(updatedItems);
	};

	const handleUpdateItem = (index: number) => {
		setCurrentOrderItem(orderItems[index])
		setMode({ type: 'update', index })
	}

	const handleCurrentItemChange = (name: string, value: string) => {
		console.log({ name, value });
		
		const fieldsToUpdate = {
			[name]: value
		}

		if (name === 'quantity' && currentOrderItem.price) {
			const tariffPerUnit = Number(currentOrderItem.price) / Number(currentOrderItem.quantity)
			
			Object.assign(fieldsToUpdate, { price: +value * tariffPerUnit })
		}

		setCurrentOrderItem(prev => {
			return {
				...prev,
				...fieldsToUpdate
			}
		})
	};

	const handleChangeCurrentItemType = (data: {value: OrderItemType, label: string}) => {
		setCurrentOrderItem(prev => {
			if (data.value === 'delivery') {
				handleCurrentItemChange('price', deliveryTariff)
			}

			return {
				...prev,
				label: data.label,
				type: data.value
			}
		})
	}

	const handleSubmit = () => {
		if (createdOrder) {
			const data = {
				id: createdOrder.id,
				customerId: createdOrder.customer.id,
				status: 'accepted' as OrderStatus,
				orderItems: orderItems.map(item => ({
					type: item.type,
					quantity: String(item.quantity),
					price: item.price,
					name: item.name
				}))
			}

			handleCreateOrder.mutateAsync(data)
		}
	};

	const renderItem = (item: OrderItem) => {
		if (item.type === 'custom') {
			return (
				<>
					{item.name}{item.quantity && `, кількість: ${item.quantity}`}{item.price && `, загальна вартість: ${item.price} грн`}
				</>
			)
		}
		return (
			<>
				{item.label} {item.quantity && `${item.quantity} шт`} {item.price && `${item.price} грн`}
			</>
		)
	}

	return (
		<Modal
			className="min-w-[80vw] modal flex flex-col p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto overflow-y-auto"
			isOpen={isOpen}
			onClose={handleClose}
			title={'Додати замовлення'}
		>
			<div className="flex justify-between gap-10">
				<div className="w-full">
					<div className="flex items-center gap-6 mb-4">
						<SearchSelect
							label={"Виберіть замовника"}
							options={userOptions}
							onChange={setQuery}
							placeholder={"Пошук замовника за телефоном"}
						/>
						<ActionButton className="w-[250px] self-end" type='button' onClick={handleCreateUser}>Новий замовник</ActionButton>
					</div>
					{currentOrderItem && (
						<div className="border p-4 rounded mb-4">
							<div className="flex justify-between gap-6 items-center mb-4">
								<OrderItemTypeSelect
									value={currentOrderItem.type}
									onChange={data => handleChangeCurrentItemType(data)}
									className="w-full mb-4"
								/>
							</div>
							{currentOrderItem.type === 'carpet' && (
								<div className="flex gap-4">
									<Input
										label="Кількість"
										name="quantity"
										value={currentOrderItem.quantity}
										onChange={(e) => handleCurrentItemChange('quantity', e.target.value)}
										placeholder="Кількість килимів"
										type="number"
									/>
								</div>
							)}
							{currentOrderItem.type === 'delivery' && (
								<div className="flex gap-4">
									<Input
										label="Кількість"
										name="quantity"
										value={currentOrderItem.quantity}
										onChange={(e) => handleCurrentItemChange('quantity', e.target.value)}
										placeholder="Кількість доставок в один бік"
										type="number"
									/>
									<Input
										label="Вартість за одиницю"
										name="price"
										value={currentOrderItem.price}
										onChange={(e) => handleCurrentItemChange('price', e.target.value)}
										placeholder="Вартість за одиницю"
										type="number"
									/>
								</div>
							)}
							{currentOrderItem.type === 'custom' && (
								<div className="flex gap-4">
									<Input
										label="Назва"
										name="name"
										value={currentOrderItem.name}
										onChange={(e) => handleCurrentItemChange('name', e.target.value)}
										placeholder="Enter name"
									/>
									<Input
										label="Кількість"
										name="quantity"
										value={currentOrderItem.quantity}
										onChange={(e) => handleCurrentItemChange('quantity', e.target.value)}
										placeholder="Кількість"
										type="number"
									/>
									<Input
										label="Вартість за одиницю"
										name="price"
										value={currentOrderItem.price}
										onChange={(e) => handleCurrentItemChange('price', e.target.value)}
										placeholder="Вартість за одиницю"
										type="number"
									/>
								</div>
							)}
						</div>
					)}
					<ActionButton disabled={!selectedUser} className="w-full mt-6" type="button" onClick={handleSubmitOrderItem}>{mode.type === 'update' ? "Оновити позицію" : "Додати позицію"}</ActionButton>
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
					{orderItems.length > 0 && (
						<div className="order-items-list">
							<h3 className="text-lg font-semibold">Позиції замовлення:</h3>
							<ul>
								{orderItems.map((item, index) => (
									<div key={`${item.label}${index}${item.quantity}`}>
										<div  className="flex justify-between my-4">
											<li>
												{renderItem(item)}
											</li>
											<div className="flex gap-2">
								            <button className="" type="button" onClick={() => handleUpdateItem(index)}><PencilIcon className="h-6 w-6"/></button>
								            <button className="" type="button" onClick={() => handleRemoveOrderItem(index)}><XMarkIcon className="h-6 w-6"/></button>
											</div>
										</div>
										<HorizontalDivider />
									</div>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
			<ActionButton
				className="mt-6"
				type="submit"
				onClick={handleSubmit}
				disabled={!selectedUser && !orderItems.length}
			>
					Зберегти замовлення
			</ActionButton>
		</Modal>
	);
}
