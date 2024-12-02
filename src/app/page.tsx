"use client";
import { userSelectors } from "@/lib/store/selectors/userSelectors";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HomePage() {
	const userProfile = useSelector(userSelectors.user)

	return (
		<div className="">
			{userProfile && (
				<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
			)}
			<div className="min-h-screen flex gap-4 p-4 justify-center items-center">
				{!userProfile && <Link href={'/login'} className="border p-2 bg-slate-300">Увійти</Link>}
				{userProfile && <Link href={'/admin'} className="border p-2 bg-slate-300">Адмін панель</Link>}
			</div>
		</div>
	);
}
