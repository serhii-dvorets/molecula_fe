"use client";
import { userSelectors } from "@/lib/store/slices/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function AdminHomePage() {
	const userProfile = useSelector(userSelectors.user)

	return (
		<div className="">
			Про нас АДМІНА
			{userProfile && (
				<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
			)}
			<Link href={'/'}>home</Link>
		</div>
	);
}
