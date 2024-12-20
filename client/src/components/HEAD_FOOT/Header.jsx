import { Box, Flex, Heading, Text, Button, Avatar, Select, IconButton, Collapse, useToast, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Actions/authActions";
import logo from "../../assets/logo.jpg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currencyState, setCurrentState] = useState('USD');
    const [isSticky, setIsSticky] = useState(false);  // New state for sticky header
    const { isAuth, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    // console.log(user)

    const randomColor = () => {
        const colors = ["red", "green", "blue", "orange", "purple", "teal"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {  // Adjust the scroll value to control when the header becomes sticky
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Box
            as="nav"
            id="userHeader"
            bg={isSticky ? "rgba(255, 255, 255, 0.1)" : 'black'}
            backdropFilter="blur(10px)"
            position={isSticky ? "fixed" : "relative"}
            top="0"
            width="100%"
            zIndex="1"
            color={isSticky ? "white" : "black"}
            p={4}
            transition="0.3s ease-in-out"
        >
            <Flex justify="space-between" align="center" maxW="7xl" mx="auto" >
                <Box display='flex' alignItems='center' >
                    <Image src={logo} alt="PharmEasy Logo" boxSize="40px" mr={2} rounded='full' />  {/* Adding the logo here */}
                    <Heading size="lg" fontWeight={550} letterSpacing="tight" sx={{
                        textShadow: isSticky ? '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' : 'none',
                    }} transition='0.3s ease-in-out' fontFamily='mono' color={isSticky ? 'white' : 'white'} _hover={{ color: 'red' }}>
                        <Link to="/" style={{ textDecoration: "none" }} >
                            PharmEasy
                        </Link>
                    </Heading>
                </Box>
                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={() => setIsOpen(!isOpen)}
                    mb={2}
                    variant="outline"
                    aria-label="Toggle Menu"
                    colorScheme={isSticky ? 'black' : 'whiteAlpha'}
                    display={{ lg: "none" }}
                />
                <Flex spacing={8} gap={4} alignItems="center" color={isSticky ? 'black' : 'white'} flexWrap="wrap" display={{ base: "none", lg: "flex" }} >
                    <Link to="/medicines">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'  >Medicines</Text>
                    </Link>
                    <Link to="/cart">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Cart</Text>
                    </Link>
                    <Link to="/contact">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Contact</Text>
                    </Link>
                    <Link to="/orders">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Orders</Text>
                    </Link>
                    <Link to="/about">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>About</Text>
                    </Link>

                    {isAuth ? (
                        <>
                            <Avatar
                                bg={randomColor()}
                                name={user?.user?.email}
                                color={'white'}

                                fontWeight='600'
                                cursor="pointer"
                                onClick={() => navigate("/profile")}
                            />
                            <Button colorScheme="red" onClick={() => {
                                dispatch(logout());
                                navigate('/login');
                            }}>Log Out</Button>

                        </>
                    ) : (
                        <Button as={Link} to="/login">
                            Login/Sign Up
                        </Button>
                    )}
                </Flex>
            </Flex>

            {/* Collapse component for the menu */}
            <Collapse in={isOpen} animateOpacity>
                <Box alignItems="center" id="userHeader2" gap={4} display={{ base: 'flex', lg: "none" }} flexWrap='wrap' color={isSticky ? 'black' : 'white'} >
                    <Link to="/medicines">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Medicines</Text>
                    </Link>
                    <Link to="/cart">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Cart</Text>
                    </Link>
                    <Link to="/contact">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Contact</Text>
                    </Link>
                    <Link to="/orders">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>Orders</Text>
                    </Link>
                    <Link to="/about">
                        <Text _hover={{ color: "red" }} transition='0.3s ease-in-out'>About</Text>
                    </Link>
                    {isAuth ? (
                        <>
                            <Avatar
                                bg={randomColor()}
                                name={user?.user?.email}
                                color={'white'}
                                cursor="pointer"
                                onClick={() => navigate("/profile")}
                            />
                            <Button colorScheme="red" onClick={() => {
                                dispatch(logout())
                                    .then((result) => {
                                        if (result.meta.requestStatus === 'fulfilled') {
                                            toast({ description: 'Sucessfull LoggedOut', status: 'success' });
                                            navigate('/');
                                        }
                                    })
                            }}>Log Out</Button>
                        </>
                    ) : (
                        <Button as={Link} to="/login">
                            Login/Sign Up
                        </Button>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};

export default Header;
