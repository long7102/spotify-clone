import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
		releaseYear: new Date().getFullYear(),


  })
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Không được bỏ tróng hình ảnh");
			}

			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/albums", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Thêm mới album thành công");
		} catch (error: any) {
			toast.error("Tạo album thất bại: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-violet-500 hover:bg-violet-600 text-white'>
					<Plus className='mr-2 h-4 w-4' />
					Thêm album
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-700'>
				<DialogHeader>
					<DialogTitle>Thêm album mới</DialogTitle>
					<DialogDescription>Thêm album mới vào bộ sưu tập của bạn</DialogDescription>
				</DialogHeader>
				<div className='space-y-4 py-4'>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleImageSelect}
						accept='image/*'
						className='hidden'
					/>
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => fileInputRef.current?.click()}
					>
						<div className='text-center'>
							<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
								<Upload className='h-6 w-6 text-zinc-400' />
							</div>
							<div className='text-sm text-zinc-400 mb-2'>
								{imageFile ? imageFile.name : "Chọn ảnh nền album"}
							</div>
							<Button variant='outline' size='sm' className='text-xs'>
								Chọn file
							</Button>
						</div>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Tên</label>
						<Input
							value={newAlbum.title}
							onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Nhập tên album'
              required
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Tác giả</label>
						<Input
							value={newAlbum.artist}
							onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Nhập tên tác giả'
              required
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Năm ra mắt</label>
						<Input
							type='number'
							value={newAlbum.releaseYear}
							onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Nhập năm ra mắt'
							min={1900}
							max={new Date().getFullYear()}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
						Hủy
					</Button>
					<Button
						onClick={handleSubmit}
						className='bg-violet-500 hover:bg-violet-600'
						disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
					>
						{isLoading ? "Đang thêm..." : "Thêm album"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
  )
}

export default AddAlbumDialog
