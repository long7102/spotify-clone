 import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const LeftSideBar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore()
    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    return (
        <div className="h-full flex flex-col gap-2">
            {/* navigator */}
            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link to={"/"} className={cn(buttonVariants(
                        {
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800"

                        }))} >
                        <HomeIcon className="size-4 mr-2" />
                        <span className="hidden md:inline">Trang chủ</span>
                    </Link>

                    <SignedIn>
                        <Link to={"/chat"} className={cn(buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start text-white hover:bg-zinc-800"

                            }))} >
                            <MessageCircle className="size-4 mr-2" />
                            <span className="hidden md:inline">Tin nhắn</span>
                        </Link>
                    </SignedIn>
                </div>
            </div>


            {/* thu vien */}
            <div className="flex-1 rounded-lg bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-4 mr-2" />
                        <span className="hidden md:inline">Danh sách phát</span>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link to={`/album/${album._id}`}
                                    key={album._id}
                                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                                >
                                    <img
                                        src={album.imageUrl}
                                        alt={album.title}
                                        className="size-12 rounded-md flex-shrink-0 object-cover"
                                    />
                                    <div className="flex-1 min-w-0 hidden md:block ">
                                        <p className="font-medium truncate">
                                            {album.title}
                                        </p>
                                        <p className="text-sm truncate text-zinc-400">
                                            {album.artist}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default LeftSideBar
