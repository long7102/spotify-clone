import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Album } from "lucide-react"
import AlbumsTable from "./AlbumsTable"
import AddAlbumDialog from "./AddAlbumDialog"

const AlbumsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between space-y-1">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Album className="h-5 w-5 text-emerald-500" />
              Thư viện album
            </CardTitle>
            <CardDescription>Quản lí danh sách phát</CardDescription>
          </div>
            <AddAlbumDialog/>
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable/>
      </CardContent>
    </Card>
  )
}

export default AlbumsTabContent
