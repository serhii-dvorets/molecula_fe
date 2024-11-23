"use client";
import { User } from "@/api/User/types";
import { SideBar } from "@/components";
import { UserDeleteModal, UserUpdateModal } from "@/components/features/admin/modals";
import { CustomersTable } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { openModal } from "@/lib/store/slices/modalSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDeleteModalSelectors, userUpdateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { userSelectors } from "@/lib/store/selectors/userSelectors";

function AdminCustomerPage() {
	const dispatch = useDispatch()
	const { handleGetAllUsers } = useGetUsers()
	const userProfile = useSelector(userSelectors.user)
	const updateRefetch = useSelector(userUpdateModalSelectors.refetch)
	const deleteRefetch = useSelector(userDeleteModalSelectors.refetch)

	const [usersData, setUsersData] = useState<{totalCount: number, data: User[] | []}>()

	useEffect(() => {
		fetchUsers()
	}, [updateRefetch, deleteRefetch])

	const fetchUsers = async () => {
		const data = await handleGetAllUsers.mutateAsync({ roles: [ROLES.CUSTOMER] })
		if (data) setUsersData(data)
	}

	const handleCreateUser = () => {
		dispatch(openModal({ modalName: 'userUpdateModal', data: null }))
	}

	return (
		<div className="">
			<SideBar>
				СТОРІНКА ЗАМОВНИКІВ
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<div className="flex gap-4 p-4">
					<Link href={'/'} className="p-2 border bg-slate-300">На головну</Link>
					<button onClick={handleCreateUser} className="p-2 border bg-slate-300">Додати замовника +</button>
				</div>
				{usersData?.data && <CustomersTable data={usersData?.data} totalCount={usersData?.totalCount}/>}
				<UserUpdateModal />
				<UserDeleteModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminCustomerPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.EMPLOYEE, ROLES.MANAGER])

