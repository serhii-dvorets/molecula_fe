import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TableActionItem } from './types';
import useOutsideClickHandler from '@/components/hooks/useOutsideClickHandler';

type TableActionsDropdownProps = {
  actions: TableActionItem[];
  disabled?: boolean;
};

const TableActionsDropdown = ({ actions, disabled }: TableActionsDropdownProps) => {
	const [isDropdownShown, setIsDropdownShown] = React.useState(false);
	const wrappedDropdownRef = React.useRef(null);

	useOutsideClickHandler(wrappedDropdownRef, () => setIsDropdownShown(false));

	const renderDropdown = () => (
		<div
			ref={wrappedDropdownRef}
			className="absolute right-[-17px] top-10 z-[9] w-[152px] rounded-[8px] border border-[#D4DFEA] bg-white px-5 py-[10px] shadow-com-wc-tooltip  [&>.dropdown-button:first-child]:border-t-0 [&>.dropdown-button]:border-t [&>.dropdown-button]:border-t-[#E7ECF3]"
		>
			{actions.map(({ label, onClick }) => (
				<div
					key={label}
					className="dropdown-button cursor-pointer py-[10px] text-left text-[0.75rem] text-black-light-soft hover:text-blue-brilliant"
					onClick={onClick}
				>
					{label}
				</div>
			))}

			<span className="absolute right-5 top-[-8px] z-[10] h-[15px] w-[15px] rotate-45 border-l border-t border-[#D4DFEA] bg-white" />
		</div>
	);

	return (
		<button
			className={twMerge(
				'flex w-full cursor-pointer items-center justify-center',
				disabled && 'cursor-not-allowed opacity-40',
			)}
			onClick={() => setIsDropdownShown(!isDropdownShown)}
			disabled={disabled}
		>
			<div className="relative">
				<i className="icon icon-24 wcicon-dots-vertical font-bold" />
				{isDropdownShown && renderDropdown()}
			</div>
		</button>
	);
};

export default TableActionsDropdown;
