import React, { Fragment, useState } from "react"
import { Button, Flex, Box, Heading, Text, Image, Icon, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/core"

export function PlayerView({ station, position, song, onModeChange, toggleSong, songIcon, skipSong, volumeChange, defaultVolume }) {
    let bottom
    let right
    let left
    if (position === `bottom-left`) {
        left = `5%`
        bottom = `5%`
    } else if (position == `bottom-right`) {
        right = `5%`
        bottom = `5%`
    } else if (position === `top-right`) {
        right = `5%`
        bottom = `85%`
    } else if (position == `top-left`) {
        left = `5%`
        bottom = `85%`
    }

    return (
        <Box
            width="500px"
            position="fixed"
            bottom={bottom}
            right={right}
            left={left}
        >
            <Button height="auto" variant="ghost" p="0" textAlign="left">
                <Flex bg="black">
                    {song ? (
                        <Fragment>
                            <Box flex="0 0 100px" onClick={() => onModeChange()}>
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
                                <Box flex="0 0 100px" onClick={() => onModeChange()}>
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
                    <Button onClick={toggleSong}>
                        {songIcon}
                    </Button>
                    <Button onClick={() => skipSong()}>
                        <Icon name="arrow-forward" size="24px" />
                    </Button>
                    <Slider defaultValue={defaultVolume} onChange={(value) => volumeChange(value)}>
                        <SliderTrack />
                        <SliderFilledTrack />
                        <SliderThumb />
                    </Slider>
                </Flex>
            </Button>
        </Box>
    )
}