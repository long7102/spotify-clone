
import Topbar from '@/components/TopBar'
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import SectionGrid from './components/SectionGrid';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useUser } from '@clerk/clerk-react';
import { useChatStore } from '@/stores/useChatStore';

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();
	const { initializeQueue } = usePlayerStore();
	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
	const { fetchUsers } = useChatStore();

	useEffect(() => {
		if (madeForYouSongs.length > 0 && trendingSongs.length > 0 && featuredSongs.length > 0) {
			const allSongs = [...madeForYouSongs, ...trendingSongs, ...featuredSongs];
			initializeQueue(allSongs);
		};
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs])
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);
	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900 mx-2'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Xin chào {user?.fullName} </h1>
					<FeaturedSection />

					<div className='space-y-10 mb-20'>
						<SectionGrid title='Dành cho bạn' songs={madeForYouSongs} isLoading={isLoading} />
						<SectionGrid title='Nổi bật' songs={trendingSongs} isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</main>
	)
}

export default HomePage
