import React from 'react';

interface SelectProps {
  label?: string;
  error?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}


export const Select = ({
	label,
	error = '',
	name,
	value,
	onChange,
	options,
	placeholder,
	required = false,
	className = '',
	disabled=false
}: SelectProps) => {
	
	return (
		<div className={`flex flex-col ${className}`}>
			{label && (
				<label htmlFor={name} className="text-sm font-medium text-gray-700 mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<div className="relative">
				      <style>
					{`
						select {
							appearance: none;
							-webkit-appearance: none;
							-moz-appearance: none;
							position: relative;
							padding-right: 2rem;
						}

						.select-container {
							position: relative;
						}

						.select-container::after {
							content: '▼';
							position: absolute;
							right: 1rem;
							top: 50%;
							transform: translateY(-50%);
							pointer-events: none;
							color: gray;
						}
					`}
				</style>
				<div className="select-container">
					<select
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						required={required}
						disabled={disabled}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 ${
							error
								? 'border-red-500 focus:ring-red-500'
								: 'border-gray-300 focus:ring-blue-500'
						}`}
					>
						{placeholder && <option value="" disabled>
							{placeholder}
						</option>}
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
				{error && (
					<small className="absolute top-10 left-0 mt-1 text-red-500 text-sm">
						{error}
					</small>
				)}
			</div>
		</div>
	);
};
