"use client";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HomePage() {
	const userProfile = useSelector(userSelectors.user)

	return (
		<div className="">
			{userProfile && (
				<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
			)}
			<div className="flex gap-4 p-4">
				<Link href={'/login'} className="border p-2 bg-slate-300">Увійти</Link>
				<Link href={'/admin'} className="border p-2 bg-slate-300">Адмін панель</Link>
			</div>
		</div>
	);
}
