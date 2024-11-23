import React, { useState } from 'react';

type SearchInputProps = {
	placeholder?: string;
	onChange?: (value: string) => void;
	options: { value: string; label: string }[];
	className?: string;
	label?: string;
	required?: boolean,
};

export const SearchSelect: React.FC<SearchInputProps> = ({
	placeholder = 'Пошук',
	onChange = () => {},
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

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className={`p-6 w-full ${className}`}>
			{label && (
				<label className="flex text-sm font-medium text-gray-700 mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<input
				type="text"
				value={searchTerm}
				onChange={handleInputChange}
				placeholder={placeholder}
				className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
				onFocus={() => setDropdownVisible(true)}
				onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
			/>
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
