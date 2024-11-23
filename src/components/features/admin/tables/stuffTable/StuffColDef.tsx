import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { TableUser } from './types';
import { ModalName } from '@/lib/features/modals/types';

const columnHelper = createColumnHelper<TableUser>();

type Props = {
	onOpenModal: (modelName: ModalName, data: TableUser) => void;
}

export function getColumns({ onOpenModal }: Props) {
	return [
		columnHelper.accessor('name', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{'Назва'}</span>,
			cell: (info) => <span className="capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('phoneNumber', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Телефон"}</span>,
			cell: (info) => <span className="capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('role', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Посада"}</span>,
			cell: (info) => <span className="capitalize text-black-soft">{info.getValue()}</span>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('update', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Змінити"}</span>,
			cell: (info) => <button onClick={() => onOpenModal('userUpdateModal', info.row.original)}>Змінити</button>,
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('delete', {
			enableSorting: false,
			header: () => <span className="whitespace-nowrap">{"Видалити"}</span>,
			cell: (info) => <button onClick={() => onOpenModal('userDeleteModal', info.row.original)}>Видалити</button>,
			footer: (info) => info.column.id,
		})
	];
}
