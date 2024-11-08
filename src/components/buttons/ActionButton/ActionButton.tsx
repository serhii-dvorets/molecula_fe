type ActionButtonProps = {
    type: "button" | "submit", 
    children: React.ReactNode, 
    onClick?: () => void, 
    className?: string
}

const ActionButton = ({ type = "button", children, onClick, className = "" }: ActionButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
		>
			{children}
		</button>
	);
};

export default ActionButton;