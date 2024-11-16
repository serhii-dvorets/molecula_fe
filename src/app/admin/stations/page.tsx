"use client";
import { SideBar, StationModal } from "@/components";
import { StationsTable } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

function AdminStationsPage() {
	const userProfile = useSelector(userSelectors.user)

	const stations = [
		{
			id: '39280324',
			name: 'Станція 1',
			location: 'Проспект Миру 2',
			averageRating: "4"
		},
		{
			id: '39280324',
			name: 'Станція 2',
			location: 'Ломоносова 20',
			averageRating: "5"
		},
		{
			id: '39280324',
			name: 'Станція 3',
			location: 'Хрещатик 35',
			averageRating: "5"
		},
	]

	return (
		<div className="">
			<SideBar>
				СТОРІНКА СТАНЦІЇ АДМІНА
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<Link href={'/'}>home</Link>
				<StationsTable stations={stations} />
				<StationModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminStationsPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])
