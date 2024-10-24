import { Box, Flex, Heading, Text, Button, IconButton, Collapse, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/Actions/authActions";

const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout())
        .then((result)=>{
            if (result.meta.requestStatus === 'fulfilled') {
                toast({ description: 'Sucessfull LoggedOut', status: 'success' });
                navigate('/');
            }})
    };

    return (
        <Box as="nav" bg="black" color="white" p={4}>
            <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
                <Heading size="lg" fontWeight={550} fontFamily={'monospace'}>
                    <Link to="/admin">Admin  Panel
                    </Link>
                </Heading>
                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={() => setIsOpen(!isOpen)}
                    variant="outline"
                    aria-label="Toggle Menu"
                    colorScheme="whiteAlpha"
                    display={{ lg: "none" }}
                />
                <Flex spacing={8} gap={4} alignItems="center" display={{ base: "none", lg: "flex" }}>
                    <Link to="/admin">
                        <Text _hover={{ color: "red" }}>Dashboard</Text>
                    </Link>
                    <Link to="/admin/orders">
                        <Text _hover={{ color: "red" }}>Orders</Text>
                    </Link>

                    <Link to="/admin/users">

                        <Text _hover={{ color: "red" }}>Users</Text>
                    </Link>
                    <Link to="/admin/add-medicine">
                        <Text _hover={{ color: "red" }}>Add Medicine</Text>
                    </Link>
                    {isAuth ? (
                        <>
                            <Avatar
                                bg='green'
                                name={user?.user?.email}
                                cursor="pointer"

                                onClick={() => navigate("/admin/profile")}

                            />
                            <Button colorScheme="red" onClick={handleLogout}>Log Out</Button>

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

                <Box alignItems="center" display={{ base: 'flex', lg: "none" }} gap={4} flexWrap='wrap'>
                <Link to="/admin">
                        <Text _hover={{ color: "red" }}>Dashboard</Text>
                    </Link>
                    <Link to="/admin/orders">
                        <Text _hover={{ color: "red" }}>Orders</Text>
                    </Link>
                    <Link to="/admin/users">
                        <Text _hover={{ color: "red" }}>Users</Text>
                    </Link>
                    <Link to="/admin/add-medicine">
                        <Text _hover={{ color: "red" }}>Add Medicine</Text>
                    </Link>
                    {isAuth ? (
                        <>
                            <Avatar
                                bg='green'
                                name={user?.user?.email}
                                cursor="pointer"
                                onClick={() => navigate("/admin/profile")}
                            />
                            <Button colorScheme="red" onClick={handleLogout}>Log Out</Button>

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

export default AdminHeader;
