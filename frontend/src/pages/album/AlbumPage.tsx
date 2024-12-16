 import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Clock, Music, Play } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const AlbumPage = () => {
    const { albumId } = useParams()
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore()
    const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId)
    }, [fetchAlbumById, albumId])

    if (isLoading) return null

    const handlePlayAlbum = () => {
        if (!currentAlbum) return
        const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id)
        if (isCurrentAlbumPlaying) 
            {togglePlay()}
        else {
            playAlbum(currentAlbum?.songs, 0)
        }
    }


    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return
        playAlbum(currentAlbum?.songs, index)
    }

    return (
        <div className="h-full mx-2">
            <ScrollArea className="h-full rounded-md">
                <div className="relative min-h-full">
                    {/* hinh nen gradient */}
                    <div
                        className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
                        aria-hidden='true'
                    />
                    {/* content */}
                    <div className='relative z-10'>
                        <div className='flex p-6 gap-6 pb-8'>
                            <img
                                src={currentAlbum?.imageUrl}
                                alt={currentAlbum?.title}
                                className='w-[240px] h-[240px] shadow-xl rounded'
                            />
                            <div className='flex flex-col justify-end'>
                                <p className='text-sm font-medium'>Album</p>
                                <h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
                                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                    <span className='font-medium text-white'>{currentAlbum?.artist}</span>
                                    <span>• {currentAlbum?.songs.length} bài hát</span>
                                    <span>• {currentAlbum?.releaseYear}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* nut play */}
                    <div className="px-6 pb-4 flex items-center gap-6">
                        <Button size="icon" onClick={handlePlayAlbum} className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all">
                            {
                                isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                                    <Play className="w-8 h-8 text-black" /> 
                                ) : (
                                    <Play className="w-8 h-8 text-black" />
                                )
                            }
                        </Button>
                    </div>

                    {/* bang */}
                    <div className="bg-black/20 backdrop-blur-sm">
                        {/* table header */}
                        <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                            <div>#</div>
                            <div>Tên</div>
                            <div>Ngày ra mắt</div>
                            <div>
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>

                        {/* bài hát */}
                        <div className="px-6">
                            <div className="space-y-2 py-4">
                                {currentAlbum?.songs.map((song, index) => {
                                    const isCurrentSong = currentSong?._id === song._id
                                    return (
                                        <div
                                            onClick={() => handlePlaySong(index)}
                                            key={song._id}
                                            className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-sm group cursor-pointer`}
                                        >
                                            <div className="flex items-center justify-center">
                                                {
                                                    isCurrentSong && isPlaying ? (
                                                        <div className="size-4 text-green-500"><Music /></div>
                                                    ) :
                                                        (
                                                            <span className="group-hover:hidden">{index + 1}</span>

                                                        )
                                                }
                                                {
                                                    !isCurrentSong && (
                                                        <Play className="w-4 h-4 hidden group-hover:block" />
                                                    )
                                                }
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <img src={song.imageUrl} alt={song.title} className="w-10 h-10" />

                                                <div>
                                                    <div className={`font-medium text-white`}>{song.title}</div>
                                                    <div>{song.artist}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                                            <div className="flex items-center">{formatDuration(song.duration)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default AlbumPage