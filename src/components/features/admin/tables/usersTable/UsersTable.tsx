import { Table } from "@/components/tables/table";
import { TableUser } from "./types";
import { getColumns } from "./UsersColDef";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";
import { ModalName } from "@/lib/features/modals/types";
import { User } from "@/api/User/types";

type Props = {
    users: User[]
}

export function UsersTable({ users }: Props) {
	const dispatch = useDispatch()
	const tableData: TableUser[] = users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			phoneNumber: user.phoneNumber,
			update: 'Змінити',
			delete: 'Видалити',
		};
	});

	const handleOpenModal = (modalName: ModalName, data: TableUser) => {
		const userData = users.find(user => user.id === data.id)
		
		dispatch(openModal({
			modalName,
			data: {
				type: 'userUpdateModal',
				id: userData?.id || data.id,
				name: userData?.name,
				phoneNumber: userData?.phoneNumber,
				notes: userData?.notes,
				city: userData?.address?.city,
				street: userData?.address?.street,
				building: userData?.address?.building,
				flat: userData?.address?.flat,
				entrance: userData?.address?.entrance,
				addressNotes: userData?.address?.notes,
				role: userData?.role.name
			}
		}))
	}

	const columns = getColumns({ onOpenModal: handleOpenModal })

	return (
		<Table<TableUser>
			data={tableData}
			columns={columns}
			emptyMessage={
				<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white p-[80px]">
					<p className="mb-[24px] text-h4 font-semibold text-grey-900">Жодного користувача поки що не додано</p>
				</div>
			}
		/>
	)
}