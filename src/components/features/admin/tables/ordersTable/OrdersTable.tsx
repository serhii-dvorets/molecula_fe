import dayjs from 'dayjs'
import { Table } from "@/components/tables/table";
import { TableItem } from "./types";
import { getColumns } from "./OrdersColDef";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";
import { ModalName } from "@/lib/features/modals/types";
import { Order } from "@/api/Order/types";
import { useState } from 'react';
import { OrderUpdateModal } from '@/components/features';

type Props = { data: Order[] | []; totalCount: number; }

export function OrdersTable({ data }: Props) {
	const dispatch = useDispatch()
	const [order, setOrder] = useState<Order>()

	const tableData: TableItem[] = data.map((order) => {
		const carpetItems = order.items.filter(item => item.type === 'carpet')
		return {
			id: order.id,
			customer: order.customer.name,
			createdAt: dayjs(order.createdAt).format('DD.MM.YYYY'),
			status: order.status,
			carpetsNumber: carpetItems.length,
			update: 'Змінити',
		};
	});

	const handleOpenModal = (modalName: ModalName, item: TableItem) => {
		const orderData = data.find(user => user.id === item.id)
		
		dispatch(openModal({
			modalName,
			data: {
				type: 'orderUpdateModal',
				id: item.id,
				customer: orderData?.customer.name || ''
			}
		}))
	}

	const columns = getColumns({ onOpenModal: handleOpenModal })

	const handleUpdateOrder = (tableData: TableItem) => {
		const orderData = data?.find(order => order.id === tableData.id)
		setOrder(orderData)
		
		dispatch(openModal({
			modalName: 'orderUpdateModal',
			data: {
				type: 'orderUpdateModal',
				id: tableData.id,
				customer: tableData?.customer || '',
			}
		}))
	}

	return (
		<>
			{tableData && (
				<Table<TableItem>
					data={tableData}
					columns={columns}
					emptyMessage={
						<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white p-[80px]">
							<p className="mb-[24px] text-h4 font-semibold text-grey-900">Жодного замовлення поки що не додано</p>
						</div>
					}
					onClickRow={(data) => handleUpdateOrder(data)}
				/>
			)}
			{order && <OrderUpdateModal orderItems={order.items} customer={order.customer}/>}
		</>
	)
}