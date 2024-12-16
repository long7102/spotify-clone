
import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Lỗi xảy ra khi upload file", error);
    throw new Error("Lỗi xảy ra khi upload file");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Vui lòng cập nhật đầy đủ thông tin" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    //nếu bài hát trong album thì cập nhật mảng
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server", error });
    next(error);
  }
};


export const deleteSong = async (req, res, next) => {
    try {
        const {id} = req.params
        const song = await Song.findById(id)
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id}
            })
        }
        await Song.findByIdAndDelete(id)
        res.status(200).json({message: "Xóa bài hát thành công"})
    } catch (error) {
        console.log("Lỗi xảy ra khi xóa bài hát", error);
        next(error)
    }
}


export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear} = req.body
        const {imageFile} = req.files
        const imageUrl = await uploadToCloudinary(imageFile);
		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
    } catch (error) {
        console.log("Lỗi xảy ra khi tạo album mới", error);
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Xóa album thành công" });
	} catch (error) {
		console.log("Xóa album thất bại", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};