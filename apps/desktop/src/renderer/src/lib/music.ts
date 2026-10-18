export interface MusicTrack {
  id: string
  title: string
  album: string
  duration: string
}

export interface MusicAlbum {
  id: string
  name: string
  kind: 'LATEST EP' | 'PREVIOUS ALBUM'
  date: string
  tracks: number
  href: string
}

export const LATEST_TRACKS: MusicTrack[] = [
  { id: '3440589170', title: "Universe's NO.1(摇摇领先)", album: 'Electro Surge', duration: '3:06' },
  { id: '3431310016', title: 'Cyber Speed(极品飞车版)', album: 'Electro Surge', duration: '3:13' },
  { id: '3433629221', title: 'Skyward Haze(灰穹之烬)', album: 'Electro Surge', duration: '2:59' },
  { id: '3437272141', title: 'MotoGP 19', album: 'Electro Surge', duration: '2:20' },
  { id: '3423097060', title: '牛来牛来', album: 'Electro Surge', duration: '2:08' },
  { id: '3440601250', title: "Universe's NO.1(摇摇领先) 伴奏", album: 'Electro Surge', duration: '3:06' },
]

export const HOT_TRACKS: MusicTrack[] = [
  { id: '2056583375', title: 'Action, Health and Achievement', album: 'Spiritual Healing', duration: '14:47' },
  { id: '1896609096', title: "Bb - Rooftop's rain", album: 'Phrygian', duration: '2:00' },
  { id: '1868713773', title: 'Flying pets', album: 'Kepler 22B', duration: '1:54' },
  { id: '2059873745', title: 'Avalokitesvara Heart Mantra（观音心咒/六字箴言）', album: 'Spiritual Healing', duration: '14:48' },
  { id: '2061419394', title: 'Panpipe sound in subtropical woods', album: 'Spiritual Healing', duration: '10:00' },
  { id: '2115258264', title: 'Bruce Wind', album: 'Focusing', duration: '9:14' },
]

export const ALBUMS: MusicAlbum[] = [
  { id: '393292034', name: 'Electro Surge', kind: 'LATEST EP', date: '2026.08.17', tracks: 6, href: 'https://music.163.com/#/album?id=393292034' },
  { id: '389248836', name: 'ZEO', kind: 'PREVIOUS ALBUM', date: '2026.07.26', tracks: 7, href: 'https://music.163.com/#/album?id=389248836' },
]
