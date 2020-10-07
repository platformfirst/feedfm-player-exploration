import React from "react"
import { Button, Flex, Box, Heading, Image } from "@chakra-ui/core"
import "../css/index.css"

export function StationsList({ activeStationId, stations, onClick }) {
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
