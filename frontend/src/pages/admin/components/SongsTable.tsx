import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMusicStore } from '@/stores/useMusicStore';
import { Calendar, Trash } from 'lucide-react';

const SongsTable = () => {
    const { songs, isLoading, error, deleteSong } = useMusicStore();

    if (isLoading) {
        return (
            <div className='flex items-center justify-center py-8'>
                Đang tải bài hát
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex items-center justify-center py-8'>
                <div className="text-red-500">{error}</div>
            </div>
        )
    }
    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-zinc-800/50'>
                    <TableHead className='w-[70px]'></TableHead>
                    <TableHead>Tên bài hát</TableHead>
                    <TableHead>Tác giả</TableHead>
                    <TableHead>Ngày ra mắt</TableHead>
                    <TableHead>Hành động</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {songs.map((song) => (

                    <TableRow key={song._id} className='hover:bg-zinc-800/50'>
                        <TableCell>
                            <img src={song.imageUrl} alt={song.title} className='size-10 object-cover rounded' />
                        </TableCell>

                        <TableCell>{song.title}</TableCell>

                        <TableCell>{song.artist}</TableCell>

                        <TableCell>
                            <span className='inline-flex items-center gap-1 text-zinc-400'>
                                <Calendar className='size-4' />
                                {song.createdAt.split('T')[0]}
                            </span>
                        </TableCell>

                        <TableCell className='text-right'>
                            <div className='flex gap-2'>
                                <Button 
                                variant="ghost" 
                                size={"sm"} 
                                onClick={() => deleteSong(song._id)}
                                className='text-red-500 hover:text-red-400/10'>
                                    <Trash className='size-4' />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}

export default SongsTable
