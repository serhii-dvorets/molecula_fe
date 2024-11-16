import { Table } from "@/components/tables/table";
import { TableStation } from "./types";
import { getColumns } from "./StationsColDef";
import { Station } from "@/api/Station/types";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/store/slices/modalSlice";

type Props = {
    stations: Station[]
}

export function StationsTable({ stations }: Props) {
	const dispatch = useDispatch()
	const stationsTableData: TableStation[] = stations.map((station) => {
		return {
			id: station.id,
			name: station.name,
			location: station.location,
			averageRating: station.averageRating,
			update: 'Змінити'
		};
	});

	const handleOpenModal = (data: TableStation) => {
		console.log('handleOpenModal', data);
		
		dispatch(openModal({
			modalName: 'stationModal',
			data: {
				type: 'stationModal',
				id: data.id,
				name: data.name,
				location: data.location
			}
		}))
	}

	const columns = getColumns({ onOpenModal: handleOpenModal })

	return (
		<Table<TableStation>
			data={stationsTableData}
			columns={columns}
			emptyMessage={
				<div className="flex w-full flex-col items-center justify-center rounded-b-2xl bg-white p-[80px]">
					<p className="mb-[24px] text-h4 font-semibold text-grey-900">Жодної станції поки що не додано</p>
				</div>
			}
		/>
	)
}