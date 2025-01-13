// 유튜브 영상 ID 추출
const extractYouTubeVideoId = (url: string) => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

export default extractYouTubeVideoId
