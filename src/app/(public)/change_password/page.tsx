"use client";

import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import PasswordInput from "@/components/inputs/PasswordInput";
import Typography from "@/components/typography/Typography";
import { useChangePassword } from "@/lib/features/user/hooks/useChangePassword";
import { clearUserErrors, userSelectors } from "@/lib/store/slices/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
	const { handleChangePassword } = useChangePassword();
	const errors = useSelector(userSelectors.errors)
	const userProfile = useSelector(userSelectors.user)

	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
		phoneNumber: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearUserErrors())
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userProfile?.phoneNumber) {
			formData.phoneNumber = userProfile.phoneNumber
		}

		handleChangePassword.mutateAsync(formData)
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center px-4">
			<Typography variant="headline-medium">Ваш номер телефону успішно підтверджено!</Typography>
			<Typography variant="body-large">Встановіть пароль</Typography>
			<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]">
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
				<ActionButton type="submit">Надіслати</ActionButton>
			</FormContainer>
		</div>
	);
}