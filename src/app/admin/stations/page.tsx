"use client";
import { Station } from "@/api/Station/types";
import { SideBar, StationModal } from "@/components";
import { StationsTable } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { useGetStations } from "@/lib/features/station/hooks/useGetStations";
import { openModal, stationModalSelectors } from "@/lib/store/slices/modalSlice";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminStationsPage() {
	const dispatch = useDispatch()
	const { handleGetAllStations } = useGetStations()
	const userProfile = useSelector(userSelectors.user)
	const refetchStations = useSelector(stationModalSelectors.refetch)

	const [stations, setStations] = useState<Station[] | []>([])

	useEffect(() => {
		fetchStations()
	}, [refetchStations])

	const fetchStations = async () => {
		const data = await handleGetAllStations.mutateAsync()
		if (data) setStations(data)
	}

	const handleCreateStation = () => {
		dispatch(openModal({ modalName: 'stationModal', data: null }))
	}

	return (
		<div className="">
			<SideBar>
				СТОРІНКА СТАНЦІЇ АДМІНА
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<div className="flex gap-4 p-4">
					<Link href={'/'} className="p-2 border bg-slate-300">home</Link>
					<button onClick={handleCreateStation} className="p-2 border bg-slate-300">Створити станцію +</button>
				</div>
				<StationsTable stations={stations} />
				<StationModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminStationsPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])
