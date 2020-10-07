import React, { useEffect, useState } from "react"
import Feed from "feed-media-audio-player"
import { Button, Flex, Box, Heading, Icon } from "@chakra-ui/core"
import "../css/index.css"
import { PlayerView } from "./PlayerView"
import { SelectedStation } from "./SelectedStation"
import { StationsList } from "./StationsList"

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
        playSong: () => {
            player.play()
        },
        stopSong: () => {
            player.stop()
        },
        skipSong: () => {
            player.skip()
        },
        changeVolume: (value) => {
            player.setVolume(value)
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
    const [paused, setPaused] = useState(true)
    const [volume, setVolume] = useState(50)
    const { stations, activeSong, activeStation, setStation, playSong, stopSong, skipSong, changeVolume } = useFeedPlayer({
        player,
    })

    const modeChange = () => {
        setMode('catalog')
    }

    const toggleSong = () => {
        if (paused === true) {
            setPaused(false)
            playSong()
        } else {
            setPaused(true)
            stopSong()
        }
    }

    const volumeChange = (value) => {
        setVolume(value)
        changeVolume(value)
    }

    const songIcon = paused ? 'PLAY' : 'STOP'

    if (mode === `player`) {
        return (
            <Box>
                <PlayerView
                    station={activeStation}
                    onModeChange={modeChange}
                    toggleSong={toggleSong}
                    songIcon={songIcon}
                    skipSong={skipSong}
                    defaultVolume={volume}
                    volumeChange={volumeChange}
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
                            <SelectedStation onClick={() => { }} station={activeStation} />
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