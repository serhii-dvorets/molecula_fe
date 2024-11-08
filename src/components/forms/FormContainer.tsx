type FormContainerProps = {
    children: React.ReactNode, 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, 
    className?: string
}

const FormContainer = ({ children, onSubmit, className = "" }: FormContainerProps) => {
	return (
		<div className={`mx-auto p-6 bg-white shadow-md rounded-lg ${className}`}>
			<form onSubmit={onSubmit} className="space-y-4">
				{children}
			</form>
		</div>
	);
};

export default FormContainer;