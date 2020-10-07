import React from "react"
import Feed from "feed-media-audio-player"
import { Button, Box } from "@chakra-ui/core"
import { FeedPlayer } from "../components/FeedPlayer"
import "../css/index.css"

// function useFeedFm() {

//   const [activeStationId, setStationId] = useState()
//   const [stations, setStations] = useState([])

//   useEffect(() => {
//     player.on("all", function (event) {
//       console.log("received: ", event)
//     })

//     player.on(`stations`, event => {

//     })

//     player.tune()

//     return () => {
//       player.stop()
//     }
//   }, [])

//   return {
//     stations,
//     setStationId: station => {
//       setStationId(station?.id)
//       player.setStationId(station?.id)
//       player.stop()
//       player.play()
//     },
//     onPlay: () => {
//       player.play()
//     },
//     onPause: () => {
//       player.pause()
//     },
//     onSkip: () => {
//       player.skip()
//     },
//     activeStationId,
//     activeSong,
//   }
// }

const feedPlayer = new Feed.Player("demo", "demo")

const IndexPage = () => {
  return (
    <Box position="relative">
      <FeedPlayer
        initialMode="player"
        player={feedPlayer}
        playerProps={{ position: `top-right` }}
      />
    </Box>
  )
}

export default IndexPage
