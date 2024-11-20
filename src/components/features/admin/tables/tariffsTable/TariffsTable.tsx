import { Table } from "@/components/tables/table";
import { TableTariff } from "./types";
import { getColumns } from "./TariffsColDef";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";
import { ModalName } from "@/lib/features/modals/types";
import { Tariff } from "@/api/Tariff/types";

type Props = {
    tariffs: Tariff[]
}

export function TariffsTable({ tariffs }: Props) {
	const dispatch = useDispatch()
	const tableData: TableTariff[] = tariffs.map((tariff) => {
		return {
			id: tariff.id,
			name: tariff.name,
			unitOfMeasurement: tariff.unitOfMeasurement,
			pricePerUnit: tariff.pricePerUnit,
			update: 'Змінити',
			delete: 'Видалити',
		};
	});

	const handleOpenModal = (modalName: ModalName, data: TableTariff) => {
		dispatch(openModal({
			modalName: modalName,
			data: {
				type: modalName,
				...data
			}
		}))
	}

	const columns = getColumns({ onOpenModal: handleOpenModal })

	return (
		<Table<TableTariff>
			data={tableData}
			columns={columns}
			emptyMessage={
				<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white p-[80px]">
					<p className="mb-[24px] text-h4 font-semibold text-grey-900">Жодної тарифу поки що не додано</p>
				</div>
			}
		/>
	)
}