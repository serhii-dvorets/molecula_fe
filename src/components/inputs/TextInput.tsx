type TextInputProps = {
    type?: "text",
    label: string, 
    name: string, 
    value: string | number | readonly string[] | undefined, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string | undefined, 
    required?: boolean
    error?: string
}

const TextInput = ({
	label,
	error = '',
	type = 'text',
	name,
	value,
	onChange,
	placeholder,
	required = false
}: TextInputProps) => {
	return (
		<div className="flex flex-col">
			{label && (
				<label htmlFor={name} className="text-sm font-medium text-gray-700">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className={`mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
					error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
				}`}
			/>
			{error && (
				<small className="text-red-500 text-sm mt-1">
					{error}
				</small>
			)}
		</div>
	);
};

export default TextInput;