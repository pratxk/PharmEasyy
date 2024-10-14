import { Box, Text, Center } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="black" color="white" p={4} mt={4}>
      <Center>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;