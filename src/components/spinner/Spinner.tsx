import React from "react";

export const Spinner: React.FC = () => {
	return (
		<div className="flex items-center justify-center fixed inset-0 bg-opacity-50 z-50">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				viewBox="0 0 200 200"
				className="animate-spin"
			>
				<line x1="100" y1="100" x2="40" y2="70" stroke="#ccc" strokeWidth="6" />
				<line x1="100" y1="100" x2="160" y2="50" stroke="#ccc" strokeWidth="6" />
				<line x1="100" y1="100" x2="60" y2="180" stroke="#ccc" strokeWidth="6" />
				<line x1="100" y1="100" x2="150" y2="150" stroke="#ccc" strokeWidth="6" />
				<line x1="100" y1="100" x2="90" y2="40" stroke="#ccc" strokeWidth="6" />

				<circle cx="100" cy="100" r="30" fill="#FFA500" />

				<circle cx="40" cy="70" r="15" fill="#FF0000" />
				<circle cx="160" cy="50" r="15" fill="#008000" />
				<circle cx="60" cy="180" r="15" fill="#0000FF" />
				<circle cx="150" cy="150" r="15" fill="#008000" />
				<circle cx="90" cy="40" r="15" fill="#FF0000" />
			</svg>
		</div>
	);
};

