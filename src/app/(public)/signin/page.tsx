"use client";

import apiSingleton from "@/api/ApiFactory";
import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import PasswordInput from "@/components/inputs/PasswordInput";
import TextInput from "@/components/inputs/TextInput";
import Typography from "@/components/typography/Typography";
import { useState } from "react";

export default function SignInPage() {
	const [formData, setFormData] = useState({
		name: "",
		phoneNumber: "",
		password: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const response = await apiSingleton.auth.signIn(formData)
		console.log('response', response);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center px-4">
			<Typography variant="headline-medium">Реєстрація</Typography>
			<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]">
				<TextInput
					label="Ім'я"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Ваше ім'я"
					required
				/>
				<TextInput
					label="Номер телефону"
					name="phoneNumber"
					value={formData.phoneNumber}
					onChange={handleChange}
					placeholder="Ваш номер телефону"
					required
				/>
				<PasswordInput
					label="Пароль"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Ваш пароль"
					required
				/>
				<ActionButton type="submit">Submit</ActionButton>
			</FormContainer>
		</div>
	);
}