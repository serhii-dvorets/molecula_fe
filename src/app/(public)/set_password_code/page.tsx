"use client";

import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import TextInput from "@/components/inputs/TextInput";
import Typography from "@/components/typography/Typography";
import { useConfirmPhoneNumber } from "@/lib/features/user/hooks/useConfirmPhoneNumber";
import { clearUserErrors, userSelectors } from "@/lib/store/slices/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
	const { handleConfirmPhoneNumber } = useConfirmPhoneNumber();
	const errors = useSelector(userSelectors.errors)

	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
		code: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(clearUserErrors())
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleConfirmPhoneNumber.mutateAsync(formData)
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center px-4">
			<Typography variant="headline-medium">Підтвердження номеру телефону</Typography>
			<Typography variant="body-large">Схоже що ви вже є в нашій системі,</Typography>
			<Typography variant="body-large">для завершення реєстрації ми надішелемо вам код на вказаний номер телефону.</Typography>
			<Typography variant="body-large">Після підтвердження телефону необхідно встановити пароль.</Typography>
			<FormContainer onSubmit={handleSubmit} className="w-full max-w-[350px]">
				<TextInput
					label="Код з повідомлення"
					name="code"
					value={formData.code}
					onChange={handleChange}
					placeholder="Код з повідомлення"
					error={errors.code}
				/>
				<ActionButton type="submit">Надіслати</ActionButton>
			</FormContainer>
		</div>
	);
}