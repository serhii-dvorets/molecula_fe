"use client";
import { SideBar } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { userSelectors } from "@/lib/store/selectors/userSelectors";
import Link from "next/link";
import { useSelector } from "react-redux";

function AdminHomePage() {
	const userProfile = useSelector(userSelectors.user)

	return (
		<div className="">
			<SideBar>
				СТОРІНКА АДМІНА
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<Link href={'/'}>home</Link>
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminHomePage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])
