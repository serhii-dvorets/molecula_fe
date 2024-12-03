import React, { useState } from 'react';

type SearchInputProps = {
	placeholder?: string;
	onChange?: (value: string) => void;
	onClick?: () => void;
	options: { value: string; label: string }[];
	className?: string;
	label?: string;
	required?: boolean;
};

export const SearchSelect: React.FC<SearchInputProps> = ({
	placeholder = 'Пошук',
	onChange = () => {},
	onClick = () => {},
	options = [],
	className = '',
	label = '',
	required
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setDropdownVisible(true);
		if (onChange) {
			onChange(value);
		}
	};

	const handleOptionSelect = (value: string, label: string) => {
		setSearchTerm(label);
		setDropdownVisible(false);
		if (onChange) {
			onChange(value);
		}
	};

	const clearInput = () => {
		setSearchTerm('');
		setDropdownVisible(false);
		if (onChange) {
			onChange('');
		}
	};

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className={`w-full ${className} relative`}>
			{label && (
				<label className="flex text-sm font-medium text-gray-700 mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<div className="relative w-full">
				<input
					type="text"
					value={searchTerm}
					onClick={onClick}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
					onFocus={() => setDropdownVisible(true)}
					onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
				/>
				{searchTerm && (
					<button
						type="button"
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
						onClick={clearInput}
					>
						&times;
					</button>
				)}
			</div>
			{dropdownVisible && filteredOptions.length > 0 && (
				<ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
					{filteredOptions.map((option) => (
						<li
							key={option.value}
							className="px-3 py-2 cursor-pointer hover:bg-gray-100"
							onMouseDown={() => handleOptionSelect(option.value, option.label)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
