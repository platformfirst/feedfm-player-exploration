import React from "react"
import { Flex, Box, Heading, Image } from "@chakra-ui/core"
import "../css/index.css"

export function SelectedStation({ station }) {
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