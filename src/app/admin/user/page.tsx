"use client";
import { User } from "@/api/User/types";
import { SideBar } from "@/components";
import { UserDeleteModal, UserUpdateModal } from "@/components/features/admin/modals";
import { UsersTable } from "@/components/features/admin/tables/usersTable";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { useGetUsers } from "@/lib/features/user/hooks/useGetUsers";
import { openModal, userDeleteModalSelectors, userUpdateModalSelectors } from "@/lib/store/slices/modalSlice";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminCustomerPage() {
	const dispatch = useDispatch()
	const { handleGetAllUsers } = useGetUsers()
	const userProfile = useSelector(userSelectors.user)
	const updateRefetch = useSelector(userUpdateModalSelectors.refetch)
	const deleteRefetch = useSelector(userDeleteModalSelectors.refetch)

	const [users, setUsers] = useState<User[] | []>([])

	useEffect(() => {
		fetchUsers()
	}, [updateRefetch, deleteRefetch])

	const fetchUsers = async () => {
		const data = await handleGetAllUsers.mutateAsync()
		if (data) setUsers(data)
	}

	const handleCreateUser = () => {
		dispatch(openModal({ modalName: 'userUpdateModal', data: null }))
	}

	return (
		<div className="">
			<SideBar>
				СТОРІНКА КЛІЄНТІВ
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<div className="flex gap-4 p-4">
					<Link href={'/'} className="p-2 border bg-slate-300">home</Link>
					<button onClick={handleCreateUser} className="p-2 border bg-slate-300">Додати користувача +</button>
				</div>
				<UsersTable users={users} />
				<UserUpdateModal />
				<UserDeleteModal />
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminCustomerPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])

