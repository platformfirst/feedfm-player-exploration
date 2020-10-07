import React, { Fragment, useEffect, useState } from "react"
import Feed from "feed-media-audio-player"
import { Button, Flex, Box, Heading, Icon, Text, Image } from "@chakra-ui/core"
import "./index.css"

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

function PlayerView({ station, position, song }) {
  let bottom
  let right
  let left
  if (position === `bottom-left`) {
    left = `10%`
    bottom = `5%`
  } else if (position == `bottom-right`) {
    right = `5%`
    bottom = `5%`
  }

  return (
    <Box
      width="320px"
      position="fixed"
      bottom={bottom}
      right={right}
      left={left}
    >
      <Button height="auto" variant="ghost" p="0" textAlign="left">
        <Flex bg="black">
          {song ? (
            <Fragment>
              <Box flex="0 0 100px">
                <Image
                  src={
                    song?.audio_file?.extra?.background_image_url ||
                    `https://via.placeholder.com/300`
                  }
                />
              </Box>
              <Box ml="10px" alignSelf="center">
                <Text color="white" fontSize="16px">
                  <strong>{song?.audio_file?.track?.title}</strong>
                </Text>
                <Text color="white" fontSize="12px">
                  {song?.audio_file?.artist?.name}
                </Text>
                <Text color="white" fontSize="10px">
                  From: {song?.audio_file?.release?.title}
                </Text>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box flex="0 0 100px">
                {station?.options?.image && (
                  <Image
                    src={station?.options?.image}
                    alt="station"
                    m="0px auto"
                  />
                )}
              </Box>
              <Box ml="10px" alignSelf="center">
                <Heading fontSize="14px" color="white">
                  {station?.name}
                </Heading>
              </Box>
            </Fragment>
          )}
        </Flex>
      </Button>
    </Box>
  )
}

function SelectedStation({ station }) {
  return (
    <Box
      bg={`black`}
      border="1px solid white"
      p="16px"
      textAlign="left"
      borderRadius="0px"
      height="auto"
    >
      <Flex flexWrap="wrap" textAlign="center">
        <Box flex="1 0 100%" alignSelf="center">
          <Heading color="#FFD700" fontSize="14px" as="h2" mb="16px">
            SELECTED
          </Heading>
          <Heading mb="16px" color="white">
            {station?.name}
          </Heading>
        </Box>
        <Box flex="1 0 100%" alignSelf="center" textAlign="center">
          {station?.options?.image && (
            <Image src={station?.options?.image} alt="station" m="0px auto" />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

function StationsList({ activeStationId, stations, onClick }) {
  return (
    <Flex>
      {stations.map(station => {
        return (
          <Box flex="0 0 33%" mr="16px">
            <Button
              p="0px"
              bg={`black`}
              onClick={() => onClick(station)}
              textAlign="left"
              borderRadius="0px"
              height="auto"
              _hover={{ bg: `transparent` }}
            >
              <Box>
                <Flex justifyContent="center">
                  <Box flexBasis="200px">
                    <Image
                      src={
                        station?.options?.image ||
                        `https://via.placeholder.com/100`
                      }
                      alt="station"
                      m="0px"
                    />
                  </Box>
                </Flex>
                <Heading
                  fontSize="14px"
                  color={activeStationId === station.id ? `#FFD700` : "white"}
                >
                  {station?.name}
                </Heading>
              </Box>
            </Button>
          </Box>
        )
      })}
    </Flex>
  )
}

export function useFeedPlayer({
  player,
  suggestedStationId,
}: {
  player: Feed.Player
  suggestedStationId?: string
}) {
  const [stations, setStations] = useState([])
  const [activeStation, setStation] = useState()
  const [activeSong, setActiveSong] = useState()
  useEffect(() => {
    player.on(`stations`, event => {
      if (event && event.length > 0) {
        setStations(event)
        setStation(event.find(evt => evt.id === suggestedStationId) || event[0])
      }
    })

    player.on(`play-started`, event => {
      setActiveSong(event)
    })

    player.tune()
  })

  return {
    activeStation,
    stations,
    setStation: station => {
      if (station?.id !== activeStation?.id) {
        player.setStationId(station?.id)
        setStation(station)
        setActiveSong()
      }
    },
    activeSong,
  }
}

export function FeedPlayer({
  player,
  initialMode = `catalog`,
  bg = `black`,
  playerProps = {
    position: `bottom-left`,
  },
  catalogProps = {
    text: `Select a playlist`,
    color: `white`,
    p: `16px`,
  },
}: {
  player: Feed.Player
  bg?: string
  playerProps?: {
    position?: string
  }
  catalogProps?: {
    color: string
    text: string
    p?: string
  }
  initialMode?: "catalog" | "player"
}) {
  const [mode, setMode] = useState(initialMode)
  const { stations, activeSong, activeStation, setStation } = useFeedPlayer({
    player,
  })

  if (mode === `player`) {
    return (
      <Box onClick={() => setMode(`catalog`)}>
        <PlayerView
          station={activeStation}
          song={activeSong}
          {...playerProps}
        />
      </Box>
    )
  }

  if (mode === `catalog`) {
    return (
      <Box bg={bg}>
        <Box maxWidth="1100px" m="0 auto" height="100vh">
          <Flex>
            <Box flex="1 0 0px">
              <Heading {...catalogProps}>{catalogProps.text}</Heading>
            </Box>
            <Box alignSelf="center">
              <Button
                _hover={{ border: `1px solid white`, bg: `transparent` }}
                bg="transparent"
                border="none"
                p="0"
                onClick={() => setMode(`player`)}
              >
                <Icon name="close" color="white" />
              </Button>
            </Box>
          </Flex>

          <Flex justifyContent="space-between">
            <Box flexBasis="50%">
              <SelectedStation onClick={() => {}} station={activeStation} />
            </Box>

            <Box flexBasis="50%" ml="32px">
              <StationsList
                activeStationId={activeStation?.id}
                onClick={station => {
                  setStation(station)
                }}
                stations={stations}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    )
  }
}

const feedPlayer = new Feed.Player("demo", "demo")

const IndexPage = () => {
  return (
    <Box position="relative">
      <FeedPlayer
        initialMode="player"
        player={feedPlayer}
        playerProps={{ position: `bottom-right` }}
      />

      <Button
        onClick={() => {
          return feedPlayer.play()
        }}
      >
        Play
      </Button>

      <Button
        onClick={() => {
          return feedPlayer.stop()
        }}
      >
        Stop
      </Button>
    </Box>
  )
}

export default IndexPage
