import apiSingleton from "@/api/ApiFactory";
import { Select } from "@/components/selects"
import { useEffect, useState } from "react";

type Props = {
    label?: string; 
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const RoleSelect = ({ label =  "Роль користувачa", onChange, value }: Props) => {
	const [options, setOptions] = useState<{value: string, label: string}[] | null>(null)

	useEffect(() => {
		const fetchRoles = async () => {
			const roles = await apiSingleton.role.getAll()
			if (roles) {
				const roleOptions = roles.filter(role => role.name !== 'superadmin').map(role => ({ value: role.name, label: role.description }))
				setOptions(roleOptions)
			}
		}

		fetchRoles()
	}, [])

	return (
		<>
			{options && (
				<Select
					label={label}
					name="role"
					value={value}
					onChange={onChange}
					options={options}
					required
				/>
			)}
		</>
	)
}