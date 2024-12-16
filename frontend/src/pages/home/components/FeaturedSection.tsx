 
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
    const {isLoading, featuredSongs, error} = useMusicStore();
    if(isLoading) return <FeaturedGridSkeleton/>
    if(error) return <p className="text-red mb-4 text-lg">{error}</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden transition-colors cursor-pointer relative"
        >
          <img src={song.imageUrl} alt="" className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0" />
          <div className="flex-1 p-4"> 
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-zinc-400 text-sm mt-1 truncate">{song.artist}</p>

          </div>
          <PlayButton song={song} />
        </div>

      ))}
    </div>
  )
}

export default FeaturedSection