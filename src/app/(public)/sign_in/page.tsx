"use client";

import { Input, PasswordInput } from "@/components";
import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import Typography from "@/components/typography/Typography";
import { useSignIn } from "@/lib/features/user/hooks/useSignIn";
import { clearUserErrors, userSelectors } from "@/lib/store/slices/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SignInPage() {
	const { handleSingIn } = useSignIn();
	const dispatch = useDispatch()
	const errors = useSelector(userSelectors.errors) 

	const [formData, setFormData] = useState({
		name: "",
		phoneNumber: "",
		password: "",
		confirmPassword: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearUserErrors())
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSingIn.mutateAsync(formData)
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center px-4">
			<Typography variant="headline-medium">Реєстрація</Typography>
			<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]">
				<Input
					label="Ім'я"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Ваше ім'я"
					error={errors.name}
				/>
				<Input
					label="Номер телефону"
					name="phoneNumber"
					value={formData.phoneNumber}
					onChange={handleChange}
					placeholder="Ваш номер телефону"
					error={errors.phoneNumber}
				/>
				<PasswordInput
					label="Пароль"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Ваш пароль"
					error={errors.password}
				/>
				<PasswordInput
					label="Підтвердження паролю"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleChange}
					placeholder="Повторіть ваш пароль"
					error={errors.confirmPassword}
				/>
				<ActionButton type="submit">Submit</ActionButton>
			</FormContainer>
		</div>
	);
}
