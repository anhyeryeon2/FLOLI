import FeedList from '@/components/FeedList/FeedList'
import * as S from '../components/FeedList/FeedList.styles'
const playlists = [
  {
    id: '1',
    title: 'Relax and Unwind',
    name: 'Chill Vibes',
    description: 'Relaxing tracks for a calm evening.',
    createdAt: '2025-01-01',
    thumbnail: 'https://via.placeholder.com/150?text=Chill+Vibes',
    profileImage: 'https://via.placeholder.com/50?text=User1',
    likes: 128,
    commentsCount: 2,
    tracks: [
      {
        id: 101,
        title: 'Ocean Waves',
        artist: 'Nature Sounds',
        duration: '3:45'
      },
      {
        id: 102,
        title: 'Peaceful Piano',
        artist: 'Soothing Tunes',
        duration: '4:12'
      },
      {
        id: 103,
        title: 'Evening Breeze',
        artist: 'Ambient Flow',
        duration: '5:20'
      }
    ]
  },
  {
    id: '2',
    title: 'High-Energy Workout',
    name: 'Workout Beats',
    description: 'High-energy tracks to fuel your workout.',
    createdAt: '2025-01-02',
    thumbnail: 'https://via.placeholder.com/150?text=Workout+Beats',
    profileImage: 'https://via.placeholder.com/50?text=User2',
    likes: 256,
    commentsCount: 2,
    tracks: [
      {
        id: 201,
        title: 'Run Faster',
        artist: 'Power Tracks',
        duration: '2:58'
      },
      { id: 202, title: 'Push It', artist: 'Gym Masters', duration: '3:30' },
      {
        id: 203,
        title: 'Cardio King',
        artist: 'Beats on Fire',
        duration: '4:15'
      }
    ]
  },
  {
    id: '3',
    title: 'Romantic Melodies',
    name: 'Romantic Tunes',
    description: 'Love songs to set the mood.',
    createdAt: '2025-01-03',
    thumbnail: 'https://via.placeholder.com/150?text=Romantic+Tunes',
    profileImage: 'https://via.placeholder.com/50?text=User3',
    likes: 342,
    commentsCount: 2, // 댓글 수로 변경
    tracks: [
      { id: 301, title: 'Serenade', artist: 'Heart Strings', duration: '4:05' },
      { id: 302, title: 'You and Me', artist: 'Love Notes', duration: '3:50' },
      {
        id: 303,
        title: 'Forever Yours',
        artist: 'Eternal Melodies',
        duration: '5:10'
      }
    ]
  }
]

export function Home() {
  return (
    <S.FeedConteiner>
      {playlists.map(playlist => (
        <FeedList
          image={playlist.thumbnail}
          profileImage={playlist.profileImage}
          nickname={playlist.name}
          likes={playlist.likes}
          track={playlist.tracks.length}
          date={playlist.createdAt}
          title={playlist.title}
          comments={playlist.commentsCount}
          key={playlist.id}
        />
      ))}
    </S.FeedConteiner>
  )
}

export default playlists
