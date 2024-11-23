"use client";
import { Tariff } from "@/api/Tariff/types";
import { SideBar, TariffUpdateModal } from "@/components";
import { TariffDeleteModal } from "@/components/features/admin/modals/tariff";
import { TariffsTable } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { useGetTariffs } from "@/lib/features/tariff/hooks/useGetTariffs";
import { openModal } from "@/lib/store/slices/modalSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tariffDeleteModalSelectors, tariffUpdateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { userSelectors } from "@/lib/store/selectors/userSelectors";

function AdminTariffPage() {
	const dispatch = useDispatch()
	const { handleGetAllTariffs } = useGetTariffs()
	const userProfile = useSelector(userSelectors.user)
	const updateRefetch = useSelector(tariffUpdateModalSelectors.refetch)
	const deleteRefetch = useSelector(tariffDeleteModalSelectors.refetch)

	const [tariffs, setTariffs] = useState<Tariff[] | []>([])

	useEffect(() => {
		fetchTariffs()
	}, [updateRefetch, deleteRefetch])

	const fetchTariffs = async () => {
		const data = await handleGetAllTariffs.mutateAsync()
		if (data) setTariffs(data)
	}

	const handleCreateTariff = () => {
		dispatch(openModal({ modalName: 'tariffUpdateModal', data: null }))
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
					<button onClick={handleCreateTariff} className="p-2 border bg-slate-300">Додати тариф +</button>
				</div>
				<TariffsTable tariffs={tariffs} />
				<TariffUpdateModal />
				<TariffDeleteModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminTariffPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])

