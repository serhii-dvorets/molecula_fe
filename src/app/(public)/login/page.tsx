"use client";

import ActionButton from "@/components/buttons/ActionButton/ActionButton";
import FormContainer from "@/components/forms/FormContainer";
import TextInput from "@/components/inputs/TextInput";
import { useState } from "react";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<FormContainer onSubmit={handleSubmit}>
				<TextInput
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Enter your name"
					required
				/>
				<TextInput
					label="Email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Enter your email"
					required
				/>
				<ActionButton type="submit">Submit</ActionButton>
			</FormContainer>
		</div>
	);
}