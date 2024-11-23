"use client";
import { User } from "@/api/User/types";
import { SideBar } from "@/components";
import { UserDeleteModal, UserUpdateModal } from "@/components/features/admin/modals";
import { StuffTable } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { openModal, userDeleteModalSelectors, userUpdateModalSelectors } from "@/lib/store/slices/modalSlice";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminStaffPage() {
	const dispatch = useDispatch()
	const { handleGetAllUsers } = useGetUsers()
	const userProfile = useSelector(userSelectors.user)
	const updateRefetch = useSelector(userUpdateModalSelectors.refetch)
	const deleteRefetch = useSelector(userDeleteModalSelectors.refetch)

	const userRole = useSelector(userSelectors.role)
	const isSuperAdmin = userRole === 'superadmin'

	const [usersData, setUsersData] = useState<{totalCount: number, data: User[] | []}>()

	useEffect(() => {
		fetchUsers()
	}, [updateRefetch, deleteRefetch])

	const roles = [ROLES.DRIVER, ROLES.EMPLOYEE, ROLES.MANAGER]

	if (isSuperAdmin) {
		roles.push(ROLES.ADMIN)
	}

	const fetchUsers = async () => {
		const data = await handleGetAllUsers.mutateAsync({ roles })
		if (data) setUsersData(data)
	}

	const handleCreateUser = () => {
		dispatch(openModal({ modalName: 'userUpdateModal', data: null }))
	}

	return (
		<div className="">
			<SideBar>
				СТОРІНКА СПІВРОБІТНИКІВ
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<div className="flex gap-4 p-4">
					<Link href={'/'} className="p-2 border bg-slate-300">На головну</Link>
					<button onClick={handleCreateUser} className="p-2 border bg-slate-300">Додати співробітника +</button>
				</div>
				{usersData?.data && <StuffTable data={usersData?.data} totalCount={usersData?.totalCount}/>}
				<UserUpdateModal />
				<UserDeleteModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminStaffPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])

