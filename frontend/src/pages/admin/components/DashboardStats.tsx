import { useMusicStore } from "@/stores/useMusicStore"
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const { stats } = useMusicStore()
  const statsData = [
    {
      icon: ListMusic,
      label: "Tổng số bài hát",
      value: stats.totalSongs.toString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Tổng số album",
      value: stats.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: PlayCircle,
      label: "Tổng số nghệ sĩ",
      value: stats.totalArtists.toString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: Users2,
      label: "Tổng số người dùng",
      value: stats.totalUsers.toLocaleString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },

  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
      {statsData.map((stat) => (
        <StatsCard key={stat.label}
          icon={stat.icon} 
          label={stat.label} 
          value={stat.value} 
          bgColor={stat.bgColor} 
          iconColor={stat.iconColor} />
      ))}
    </div>
  )
}

export default DashboardStats
