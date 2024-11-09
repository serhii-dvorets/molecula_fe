"use client";
import { userSelectors } from "@/lib/features/user/userSlice";
import { showToast } from "@/lib/toast/showToast";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
	const userProfile = useSelector(userSelectors.user)

	showToast("success", <p>Your post has been published!</p>);
	return (
		<div className="">
		{userProfile && (
			<div>Привіт, {userProfile.name}! Бачимо що ти залогінився!</div>
		)}
		</div>
	);
}
