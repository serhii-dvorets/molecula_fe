type ActionButtonProps = {
    type: "button" | "submit";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

const ActionButton = ({
	type = "button",
	children,
	onClick,
	className = "",
	disabled = false,
	...props
}: ActionButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
				disabled
					? "bg-gray-200 text-gray-700 cursor-not-allowed"
					: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
			} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default ActionButton;
