import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import { Modal, HorizontalDivider, Input } from "@/components";
import { useManageOrder } from "@/lib/features/order/hooks/useManageOrder";
import { closeModal } from "@/lib/store/slices/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderUpdateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { useGetTariffs } from "@/lib/features/tariff/hooks/useGetTariffs";
import { OrderItemTypeSelect } from "../../selects";
import { PencilIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Tariff } from "@/api/Tariff/types";

type Props = {
	// orderId?: number;
	orderItems: any[];
	customer: any;
};

export function OrderUpdateModal({ orderItems: initialOrderItems, customer }: Props) {
	const modalName = "orderUpdateModal";
	const dispatch = useDispatch();
	const modalState = useSelector(orderUpdateModalSelectors.state);
	const isOpen = modalState?.isOpen;

	const { handleUpdateOrderItem } = useManageOrder();
	const { handleGetAllTariffs } = useGetTariffs();
	const [tariffs, setTariffs] = useState<Tariff[]>([]);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [orderItems, setOrderItems] = useState([...initialOrderItems]);

	const fetchTariffs = async () => {
		const tariffs = await handleGetAllTariffs.mutateAsync();
		if (tariffs) setTariffs(tariffs);
	};

	useEffect(() => {
		fetchTariffs();
	}, []);

	const handleCalculatePrice = (height: number | null, width: number | null) => {
		const tariffPerSquareMeter = tariffs.find((tariff) => tariff.name === "Прання")?.pricePerUnit || 0;
		if (height && width && tariffPerSquareMeter) {
			return (Number(height) * Number(width)) * Number(tariffPerSquareMeter);
		}
		return 0;
	};

	const handleItemChange = (index: number, field: string, value: string | number) => {
		const updatedItems = orderItems.map((item, i) => {
			if (i !== index) return item;

			const newItem = { ...item, [field]: value };
			if (field === "height" || field === "width") {
				const newPrice = handleCalculatePrice(newItem.height, newItem.width);
				return { ...newItem, price: newPrice.toFixed(2) };
			}

			return newItem;
		});
		setOrderItems(updatedItems);
	};

	const handleSaveItem = async (index: number) => {
		const updatedItem = orderItems[index];
		// TODO: Call API to update the order item
		await handleUpdateOrderItem.mutateAsync(updatedItem);
		setExpandedIndex(null);
	};

	const handleDeleteItem = async (index: number) => {
		const updatedItems = orderItems.filter((_, i) => i !== index);
		setOrderItems(updatedItems);
		// TODO: Call API to delete the order item if necessary
	};

	const handleClose = () => {
		dispatch(closeModal(modalName));
		setExpandedIndex(null);
	};

	return (
		<Modal
			className="min-w-[80vw] modal flex flex-col p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto overflow-y-auto"
			isOpen={isOpen}
			onClose={handleClose}
			title={"Оновити замовлення"}
		>
			<div className="customer-block mb-6">
				<div className="flex flex-col gap-4 customer-info mt-4 p-4 border rounded bg-gray-50">
					<p className="flex w-full justify-between">
						<strong>{`Ім'я: `}</strong>
						{customer?.name || " - "}
					</p>
					<p className="flex w-full justify-between">
						<strong>{"Телефон: "}</strong>
						{customer?.phoneNumber || " - "}
					</p>
				</div>
			</div>
			<div className="order-items-list">
				<h3 className="text-lg font-semibold">Позиції замовлення:</h3>
				<ul>
					{orderItems.map((item, index) => (
						<div key={`${item.id}${index}`} className="mb-4">
							<div className="flex justify-between items-center">
								<div>
									<strong>{item.type}</strong>{" "}
									<span>
										{item.status}, {item.price && `${item.price} грн`}
									</span>
								</div>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
									>
										<PencilIcon className="h-6 w-6" />
									</button>
									<button
										type="button"
										onClick={() => handleDeleteItem(index)}
									>
										<XMarkIcon className="h-6 w-6" />
									</button>
								</div>
							</div>
							{expandedIndex === index && (
								<div className="mt-4 p-4 border rounded">
									<div className="mb-4">
										<OrderItemTypeSelect
											value={item.type}
											onChange={(data) => handleItemChange(index, "type", data.value)}
										/>
									</div>
									<div className="flex gap-4 mb-4">
										<Input
											label="Висота (см)"
											placeholder="Висота (см)"
											name="height"
											value={item.height || ""}
											onChange={(e) => handleItemChange(index, "height", +e.target.value)}
											type="number"
										/>
										<Input
											label="Ширина (см)"
											placeholder="Ширина (см)"
											name="width"
											value={item.width || ""}
											onChange={(e) => handleItemChange(index, "width", +e.target.value)}
											type="number"
										/>
									</div>
									<div>
										{`Ціна: ${item.price}`}
									</div>
									<ActionButton
										className="w-full mt-4"
										type="button"
										onClick={() => handleSaveItem(index)}
									>
										Зберегти зміни
									</ActionButton>
								</div>
							)}
							<HorizontalDivider />
						</div>
					))}
				</ul>
			</div>
			<ActionButton
				className="mt-6"
				type="button"
				onClick={handleClose}
			>
				Закрити
			</ActionButton>
		</Modal>
	);
}
