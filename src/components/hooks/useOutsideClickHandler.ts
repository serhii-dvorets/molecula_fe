import React, { useEffect } from 'react';

export const useOutsideClickHandler = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void) => {
	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (ref.current && !ref.current.contains(evt.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
};

export default useOutsideClickHandler;
