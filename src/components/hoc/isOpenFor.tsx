'use client';

import { userSelectors } from "@/lib/store/selectors/userSelectors";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function isOpenFor(Component: React.FC, roles: string[]) {
	return function IsOpenFor(props: any) {
		const userRole = useSelector(userSelectors.role)

		if (!userRole || !roles.includes(userRole)) {
			return redirect('/')
		}

		return (<Component {...props} />)
	}
}