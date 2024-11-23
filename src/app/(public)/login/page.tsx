"use client";

import { Input, PasswordInput } from "@/components";
import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import Typography from "@/components/typography/Typography";
import { useLogIn } from "@/lib/features/user/hooks/useLogIn";
import { userSelectors } from "@/lib/store/selectors/userSelectors";
import { clearUserErrors } from "@/lib/store/slices/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
	const { handleLogIn } = useLogIn();
	const errors = useSelector(userSelectors.errors)

	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
		phoneNumber: "",
		password: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearUserErrors())
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleLogIn.mutateAsync(formData)
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center px-4">
			<Typography variant="headline-medium">Логін</Typography>
			<FormContainer onSubmit={handleSubmit} className="w-full max-w-[400px]">
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
				<ActionButton type="submit">Submit</ActionButton>
			</FormContainer>
		</div>
	);
}