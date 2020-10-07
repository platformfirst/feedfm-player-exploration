// import React, { useEffect, useState } from "react"
// import Feed from "feed-media-audio-player"
// import { Button, Flex, Box, Text, Image, Stack } from "@chakra-ui/core"
// import "./index.css"

// export function useFeedPlayer(player) {

// }

// function useFeedFm() {
//   const [activeSong, setActiveSong] = useState()
//   const [activeStationId, setStationId] = useState()
//   const [stations, setStations] = useState([])

//   useEffect(() => {
//     player.on("all", function (event) {
//       console.log("received: ", event)
//     })

//     player.on(`stations`, event => {
//       if (event && event.length > 0) {
//         setStations(event)
//         setStationId(event[0].id)
//       }
//     })

//     player.on(`play-started`, event => {
//       setActiveSong(event)
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

// function ActiveSong({ audio_file }) {
//   return (
//     <Box
//       border="1px solid rgba(0, 0, 0, 0.12)"
//       maxWidth="300px"
//       m="0 auto 15px"
//       p="24px 16px"
//       textAlign="center"
//     >
//       {audio_file?.extra?.background_image_url && (
//         <Image src={audio_file?.extra?.background_image_url} />
//       )}
//       <Box>
//         <Text fontSize="16px">
//           <strong>{audio_file?.track?.title}</strong>
//         </Text>
//         <Text fontSize="12px">{audio_file?.artist?.name}</Text>
//         <Text fontSize="10px">From: {audio_file?.release?.title}</Text>
//       </Box>
//     </Box>
//   )
// }

// function StationItem({ activeStationId, station, onClick }) {
//   return (
//     <Button
//       bg={activeStationId === station.id ? `#d4ebf2` : `white`}
//       onClick={() => onClick(station)}
//       p="16px"
//       textAlign="left"
//       border="1px solid rgba(0, 0, 0, 0.12)"
//       borderRadius="0px"
//       height="auto"
//       mb="10px"
//     >
//       <Flex>
//         <Box flexBasis="100px" mr="10px" alignSelf="center">
//           <Image src={station?.options?.image} alt="station" m="0px" />
//         </Box>
//         <Box flexBasis="auto" alignSelf="center">
//           <Text m={0}>{station?.name}</Text>
//           <Text m={0}>
//             {station?.options?.subhead || station?.options?.subheader}
//           </Text>
//         </Box>
//       </Flex>
//     </Button>
//   )
// }

// function Player() {
//   const {
//     stations,
//     activeStationId,
//     setStationId,
//     activeSong,
//     onPlay,
//     onPause,
//     onSkip,
//   } = useFeedFm()
//   return (
//     <Box maxWidth="1100px" m="32px auto">
//       <Flex>
//         <Box flexBasis="50%">
//           {stations.map(station => {
//             return (
//               <StationItem
//                 activeStationId={activeStationId}
//                 onClick={setStationId}
//                 key={station.id}
//                 station={station}
//               />
//             )
//           })}
//         </Box>

//         <Box flexBasis="50%" textAlign="center">
//           <Box id="player-view-div" />
//           {activeSong ? (
//             <ActiveSong {...activeSong} />
//           ) : (
//             <Text mb="10px">Press Play to begin</Text>
//           )}

//           <Stack direction="row" justifyContent="center">
//             <Button onClick={onPlay}>Play</Button>
//             <Button onClick={onPause}>Pause</Button>
//             <Button onClick={onSkip}>Skip</Button>
//           </Stack>
//         </Box>
//       </Flex>
//     </Box>
//   )
// }
