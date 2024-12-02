"use client";
import { OrdersTable, SideBar } from "@/components";
import isOpenFor from "@/components/hoc/isOpenFor";
import { ROLES } from "@/lib/constants/roles";
import { openModal } from "@/lib/store/slices/modalSlice";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrders } from "@/lib/features/order/hooks/useGetOrders";
import { Order } from "@/api/Order/types";
import { orderCreateModalSelectors } from "@/lib/store/selectors/modalSelectors";
import { userSelectors } from "@/lib/store/selectors/userSelectors";
import { OrderCreateModal, UserUpdateModal } from "@/components/features/admin";
import { User } from "@/api/User/types";

function AdminOrderPage() {
	const dispatch = useDispatch()
	const { handleGetAllOrders } = useGetOrders()
	const userProfile = useSelector(userSelectors.user)
	const updateRefetch = useSelector(orderCreateModalSelectors.refetch)
	const [createdUser, setCreatedUser] = useState<User>()

	const [ordersData, setOrdersData] = useState<{totalCount: number, data: Order[] | []}>()

	const fetchOrders = useCallback(async () => {
		const data = await handleGetAllOrders.mutateAsync()
		if (data) setOrdersData(data)
	}, [])

	console.log(ordersData);
	

	useEffect(() => {
		fetchOrders()
	}, [updateRefetch, fetchOrders])


	const handleAddOrder = () => {
		dispatch(openModal({ modalName: 'orderCreateModal', data: null }))
	}
	
	const handleCreateUser = () => {
		dispatch(openModal({ modalName: 'userUpdateModal', data: null }))
	}

	const handleSetCreatedUser = (user: User) => {
		setCreatedUser(user)
	}

	return (
		<div className="">
			<SideBar>
				Сторінка замовлень
				{userProfile && (
					<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
				)}
				<div className="flex gap-4 p-4">
					<Link href={'/'} className="p-2 border bg-slate-300">home</Link>
					<button onClick={handleAddOrder} className="p-2 border bg-slate-300">Створити замовлення +</button>
				</div>
				{ordersData?.data && <OrdersTable data={ordersData.data} totalCount={ordersData.totalCount} />}
				<OrderCreateModal handleCreateUser={handleCreateUser} createdUser={createdUser} setCreatedUser={setCreatedUser} />
				<UserUpdateModal setCreatedUser={handleSetCreatedUser}/>
			</SideBar>
		</div>
	);
}

export default isOpenFor(AdminOrderPage, [ROLES.ADMIN, ROLES.SUPER_ADMIN])

