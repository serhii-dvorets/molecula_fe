import React, { useState } from "react";

interface SearchInputProps {
  width?: string;
  placeholder?: string;
  onChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
	width = "w-full",
	placeholder = "Пошук ...",
	onChange,
}) => {
	const [query, setQuery] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		onChange(value);
	};

	return (
		<div className={`relative ${width}`}>
			<input
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder={placeholder}
				className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
};
