import React, { useEffect } from "react";
import { Transition } from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen = false, onClose, title, children, className = '' }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	return (
		<Transition
			show={isOpen}
			enter="transition-opacity duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`}>
				<div className="flex items-center justify-center min-h-screen">
					<div className={`bg-white rounded-lg shadow-lg w-max p-6 relative ${className}`}>
						<button
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
							onClick={onClose}
						>
							<span className="text-xl">&times;</span>
						</button>

						<h2 className="text-xl font-bold text-center mb-4">{title}</h2>
						<div>{children}</div>
					</div>
				</div>
			</div>
		</Transition>
	);
};
