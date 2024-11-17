import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { TableStation } from './types';
import { ModalName } from '@/lib/features/modals/types';

const columnHelper = createColumnHelper<TableStation>();

type Props = {
	onOpenModal: (modelName: ModalName, data: TableStation) => void;
}

export function getColumns({ onOpenModal }: Props) {
	return [
		columnHelper.accessor('name', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{'Назва'}</span>,
			cell: (info) => <span className="capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('location', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Адреса"}</span>,
			cell: (info) => <span className="capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('averageRating', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Рейтинг"}</span>,
			cell: (info) => <span className="text-sm capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('update', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Змінити"}</span>,
			cell: (info) => <button onClick={() => onOpenModal('stationUpdateModal', info.row.original)}>Змінити</button>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('delete', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Видалити"}</span>,
			cell: (info) => <button onClick={() => onOpenModal('stationDeleteModal', info.row.original)}>Видалити</button>,
			footer: (info) => info.column.id,
		})
	];
}
