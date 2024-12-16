import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<string | null>(null)
    const {currentSong, isPlaying, playNext} = usePlayerStore();
    //playsong
    useEffect(() => {
        if(isPlaying)
            audioRef.current?.play()
        else
            audioRef.current?.pause()
    }, [isPlaying, audioRef])

    //ket thuc bai hat
    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener('ended', () => {
            playNext();
        })
        return () => {
            audio?.removeEventListener('ended', () => {
                playNext();
            })
        }
    }, [audioRef, playNext])

    //doi bai hat
    useEffect(() => {   
        if(!audioRef.current || !currentSong) return
        const audio = audioRef.current;
        //kiem tra xem co phai bai hat moi ko
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl
        if(isSongChange){
            audio.src = currentSong?.audioUrl;
            //thanh phat tro ve 0
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl
            if(isPlaying) audio.play()
        }
    }, [currentSong, audioRef, isPlaying])

  return  <audio ref={audioRef}  />
}

export default AudioPlayer
