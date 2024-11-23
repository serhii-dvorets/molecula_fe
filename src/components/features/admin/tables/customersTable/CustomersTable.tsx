import { Table } from "@/components/tables/table";
import { TableItem } from "./types";
import { getColumns } from "./CustomersColDef";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";
import { ModalName } from "@/lib/features/modals/types";
import { User } from "@/api/User/types";
import { dumpUserForModal } from "@/api/User/userDump";

type Props = { data: User[] | []; totalCount: number; }

export function CustomersTable({ data: users }: Props) {
	const dispatch = useDispatch()
	const tableData: TableItem[] = users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			phoneNumber: user.phoneNumber,
			update: 'Змінити',
			delete: 'Видалити',
		};
	});

	const handleOpenModal = (modalName: ModalName, data: TableItem) => {
		const userData = users.find(user => user.id === data.id)
		
		dispatch(openModal({
			modalName,
			data: {
				type: 'userUpdateModal',
				id: data.id,
				...dumpUserForModal(userData)
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
							<p className="mb-[24px] text-h4 font-semibold text-grey-900">Жодного замовника поки що не додано</p>
						</div>
					}
				/>
			)}
		</>
	)
}