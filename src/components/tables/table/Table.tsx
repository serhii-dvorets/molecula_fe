import * as React from 'react';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	Updater,
} from '@tanstack/react-table';

import { ReactTableProps } from './types';

import sortingFns from './sortingFns';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const Table = <T extends object>(props: ReactTableProps<T>) => {
	const { data, columns, sorting = [], onSortChange, emptyMessage } = props;
	const [tableSorting, setTableSorting] = React.useState<SortingState>(sorting);
	const onClickRow = props.onClickRow || function() {};

	const updateSorting = (updater: Updater<SortingState>) => {
		if (!('sorting' in props)) {
			setTableSorting(updater);
		}

		if (onSortChange) {
			onSortChange(updater);
		}
	};

	React.useEffect(() => {
		if ('sorting' in props) {
			setTableSorting(sorting);
		}
	}, [sorting]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting: tableSorting,
		},
		onSortingChange: updateSorting,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		sortingFns,
	});

	const renderSortIcon = (dir: string) => {
		return (
			<div
				className={twMerge(
					'flex h-8 w-6 flex-col items-center justify-center rounded-md border border-[#DDE2EC] text-[10px] leading-none text-black-soft',
					dir !== 'none' && 'border-blue-dark bg-white-soft',
				)}
			>
				<span className={dir === 'asc' ? 'ext-grey' : ''}>up</span>
				<span className={dir === 'desc' ? 'text-grey' : ''}>down</span>
			</div>
		);
	};

	return (
		<table className="min-w-full border-separate border-spacing-0">
			<thead className="">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr className="" key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								className={twMerge(
									'sticky top-0 z-10 items-start border-b border-b-[#D4DFEA] p-0 align-middle text-[0.75rem] font-medium text-black-soft transition initial:text-left [&:first-of-type_.del-th-content]:rounded-tl-2xl [&:last-of-type_.del-th-content]:rounded-tr-2xl',
								)}
								key={header.id}
							>
								<div className="absolute top-0 z-[-1] h-[calc(3rem+var(--titleonscroll-height))] w-full -translate-y-[calc(100%-1rem)] bg-white-background shadow-[1px_0_0_#ECF4FA]"></div>
								<div className="del-th-content h-14 bg-white">
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: twMerge(
													'h-14 isolate relative before:absolute before:bottom-0 before:z-[1] before:left-0 items-center justify-between inline-flex before:right-0 w-full gap-5 px-5 before:h-[3px] before:bg-blue-brilliant font-semibold before:opacity-0',
													header.column.getCanSort() && 'cursor-pointer select-none hover:text-blue-brilliant',
													header.column.getIsSorted() && 'text-blue-brilliant before:opacity-100',
												),
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{header.column.getCanSort()
												? {
													asc: renderSortIcon('asc'),
													desc: renderSortIcon('desc'),
												}[header.column.getIsSorted() as string] ?? renderSortIcon('none')
												: null}
										</div>
									)}
								</div>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody
				className={clsx(
					'bg-[#F8FCFF]',
					'[&>tr:last-of-type>td:first-of-type]:rounded-bl-2xl [&>tr:last-of-type>td:last-of-type]:rounded-br-2xl',
					'[&_td:first-of-type]:border-l [&_td:first-of-type]:border-l-[#D4DFEB] [&_td:last-of-type]:border-r [&_td:last-of-type]:border-r-[#D4DFEB]',
					'[&_tr:last-of-type_td]:border-b [&_tr:last-of-type_td]:border-b-[#D4DFEB]',
				)}
			>
				{!data.length && emptyMessage && (
					<tr className="animate-fade-in" style={{ animationDuration: `300ms` }}>
						<td colSpan={columns.length}>{emptyMessage}</td>
					</tr>
				)}

				{table.getRowModel().rows.map((row) => (
					<tr
						className={clsx(
							'animate-fade-in',
							'relative',
							'[&:nth-child(even)>td]:bg-white [&:nth-child(odd)>td]:bg-[#F8FCFF]',
						)}
						style={{ animationDuration: `300ms` }}
						key={row.id}
						onClick={() => onClickRow(row.original)}
					>
						{row.getVisibleCells().map((cell, idx, arr) => {
							const { _rowSpan: rowSpanData } = row.original as {
                  [key: string]: any;
                };
							const rowSpan = rowSpanData?.[cell.column.id];

							if (rowSpan === 0) return null;

							return (
								<td
									className={twMerge(
										'px-4 py-4 text-sm font-medium leading-[145%] text-black-soft ',
										rowSpan ? 'align-top' : 'align-middle',
										rowSpanData ? 'h-8' : 'h-[5.375rem]',
										rowSpanData?.[arr[0].column.id] === 0 && '!border-l-0',
										rowSpanData?.[arr[arr.length - 1].column.id] === 0 && '!border-r-0',
									)}
									key={cell.id}
									rowSpan={rowSpan}
								>
									<div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
