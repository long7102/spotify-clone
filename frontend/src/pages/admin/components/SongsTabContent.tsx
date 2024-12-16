import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import SongsTable from "./SongsTable"
import AddSongDialog from "./AddSongDialog"

const SongsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between space-y-1">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-emerald-500" />
              Thư viện bài hát
            </CardTitle>
            <CardDescription>Quản lí thư viện bài hát</CardDescription>
          </div>
          <AddSongDialog/>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable/>
      </CardContent>
    </Card>
  )
}

export default SongsTabContent
