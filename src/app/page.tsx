"use client";
import { userSelectors } from "@/lib/features/user/userSlice";
import { useSelector } from "react-redux";

export default function Home() {
	const userProfile = useSelector(userSelectors.user)

	return (
		<div className="">
			{userProfile && (
				<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
			)}
		</div>
	);
}
