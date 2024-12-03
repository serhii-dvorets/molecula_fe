import { Table } from "@/components/tables/table";
import { TableItem } from "./types";
import { getColumns } from "./OrdersColDef";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";
import { ModalName } from "@/lib/features/modals/types";
import { Order } from "@/api/Order/types";

type Props = { data: Order[] | []; totalCount: number; }

export function OrdersTable({ data }: Props) {
	const dispatch = useDispatch()
	const tableData: TableItem[] = data.map((order) => {
		return {
			id: order.id,
			customer: order.customer.name,
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
				/>
			)}
		</>
	)
}