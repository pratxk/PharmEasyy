import { Box, Text, Center } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" id='userFooter' bg="black" color="white" fontSize='sm' p={4} mt={4}>
      <Center>
        <Text id='footText' fontSize="sm">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;