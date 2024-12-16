import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "./ui/button";

const Topbar = () => {
	const { isAdmin } = useAuthStore()

	return (
		<div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 rounded-lg mx-2 my-2'>
			<div className='flex gap-2 items-center font-bold'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>
			<div className='flex items-center gap-4'>
				<SignedIn>
					{isAdmin && (
						<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
							<LayoutDashboardIcon className='size-4 mr-2' />
							Admin
						</Link>
					)}
					<UserButton/>
					<SignOutButton>
						<Button variant="ghost" size="icon">
							<LogOutIcon className="size-5" />
						</Button>
					</SignOutButton>
				</SignedIn>

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>
			</div>
		</div>
	);
};
export default Topbar;