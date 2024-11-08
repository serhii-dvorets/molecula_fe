// components/PasswordInput.js
import Image from "next/image";
import { useState } from "react";

type PasswordInputProps = {
    type?: "text",
    label: string, 
    name: string, 
    value: string | number | readonly string[] | undefined, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string | undefined, 
    required?: boolean
    error?: string
}

const PasswordInput = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	required = false,
	error,
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<div className="flex flex-col">
			{label && (
				<label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<div className="relative mt-1">
				<input
					type={showPassword ? "text" : "password"}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
						error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
					}`}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute inset-y-0 right-3 flex items-center text-gray-500"
				>
					<Image src={showPassword ? '/components_icons/password_eye_closed.png' : '/components_icons/password_eye_open.png'} height={20} width={20} alt="eye"/>
				</button>
			</div>
			{error && (
				<small className="text-red-500 text-sm mt-1">
					{error}
				</small>
			)}
		</div>
	);
};

export default PasswordInput;
