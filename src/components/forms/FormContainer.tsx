type FormContainerProps = {
    children: React.ReactNode, 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, 
    className?: string
	autoComplete?: 'on' | 'off'
	shadow?: string
}

const FormContainer = ({ children, onSubmit, className = "", autoComplete = 'on', shadow = 'shadow-md' }: FormContainerProps) => {
	return (
		<div className={`mx-auto p-6 bg-white ${shadow} rounded-lg ${className}`}>
			<form onSubmit={onSubmit} className="space-y-8" autoComplete={autoComplete}>
				{children}
			</form>
		</div>
	);
};

export default FormContainer;