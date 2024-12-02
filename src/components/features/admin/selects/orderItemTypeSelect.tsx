import { OrderItemType } from "@/api/OrderItem/types";
import { Select } from "@/components/selects"

type Props = {
    label?: string; 
    value: OrderItemType;
    onChange: ({ value, label }: { value: OrderItemType, label: string }) => void;
	disabled?: boolean;
	className?: string;
}

export const OrderItemTypeSelect = ({ label =  "Тип замовлення", onChange, value, ...props }: Props) => {
	const options = [
		{ label: 'Килим', value: 'carpet' as OrderItemType },
		{ label: 'Меблі', value: 'furniture' as OrderItemType },
		{ label: 'Доставка', value: 'delivery' as OrderItemType },
		{ label: 'Інше', value: 'custom' as OrderItemType },
	]

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const option = options.find(option => option.value === e.target.value)
		if (option) {
			onChange(option)
		}
	}

	return (
		<>
			{options && (
				<Select
					label={label}
					name="orderItemType"
					value={value}
					onChange={(e) => handleChange(e)}
					options={options}
					required
					{...props}
				/>
			)}
		</>
	)
}