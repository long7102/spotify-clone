import { useAuthStore } from '@/stores/useAuthStore'
import Header from './components/Header'
import DashboardStats from './components/DashboardStats'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Album, Music } from 'lucide-react'
import { TabsContent } from '@radix-ui/react-tabs'
import AlbumsTabContent from './components/AlbumsTabContent'
import SongsTabContent from './components/SongsTabContent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMusicStore } from '@/stores/useMusicStore'

const AdminPage = () => {
    const naviagate = useNavigate()
    const { isAdmin, isLoading } = useAuthStore()

    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore()
    if (!isAdmin && !isLoading) {
        alert('Bạn không phải là admin')
        naviagate('/')
    }

    useEffect(() => {
            fetchAlbums()
            fetchSongs()
            fetchStats()
    }, [fetchAlbums, fetchSongs, fetchStats])
    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
            <Header />

            <DashboardStats />

            <Tabs defaultValue='songs' className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                        <Music className='mr-2 size-4' />
                        Bài hát
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs' className='space-y-4'>
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value='albums' className='space-y-4'>
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage
