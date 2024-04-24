// Complete the Index page component here
// Use chakra-ui
import { Box, Flex, IconButton, Image, Input, Link, useDisclosure, VStack } from "@chakra-ui/react";
import { FaBars, FaSearch, FaUserAlt, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated logged in state
  const [userEmail, setUserEmail] = useState("user@example.com"); // Simulated user email
  const [userRoles, setUserRoles] = useState(["Creator"]); // Simulated user roles

  // Simulated AuthService methods
  const AuthService = {
    isLoggedIn: () => true,
    getUser: () => ({ email: "user@example.com", roles: ["Creator"] }),
    logout: () => console.log("Logged out"),
  };

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setIsLoggedIn(AuthService.isLoggedIn());
      setUserEmail(user.email);
      setUserRoles(user.roles);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUserEmail("");
    setUserRoles([]);
  };

  const hasAdminRole = () => userRoles.includes("Creator");

  return (
    <Box bg="blue.500" w="100%" p={4} color="white" position="sticky" top="0" zIndex="sticky">
      <Flex justify="space-between" align="center" wrap="wrap">
        <Flex align="center">
          <Image src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3MTM5NjQ2MDB8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Company Logo" boxSize="50px" />
          <IconButton display={{ base: "flex", md: "none" }} onClick={isOpen ? onClose : onOpen} icon={isOpen ? <FaTimes /> : <FaBars />} variant="outline" aria-label="Open Menu" />
        </Flex>
        <Flex display={{ base: isOpen ? "flex" : "none", md: "flex" }} width={{ base: "full", md: "auto" }} flexGrow={1}>
          <Input placeholder="Search" bg="white" color="black" borderRadius="md" mx={2} />
          <IconButton aria-label="Search" icon={<FaSearch />} />
        </Flex>
        <Box display={{ base: isOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
          <Flex align="center">
            <Link href="/categories" px={2}>
              Categories
            </Link>
            {hasAdminRole() && (
              <Link href="/admin" px={2}>
                Admin
              </Link>
            )}
            {isLoggedIn ? (
              <Flex align="center">
                <span>{userEmail}</span>
                <button onClick={handleLogout}>Logout</button>
              </Flex>
            ) : (
              <IconButton icon={<FaUserAlt />} aria-label="Login" />
            )}
          </Flex>
        </Box>
      </Flex>
      {hasAdminRole() && (
        <VStack spacing={4} display={isOpen ? "flex" : "none"}>
          <Link href="/admin/categories">Manage Categories</Link>
          <Link href="/admin/posts">Manage Posts</Link>
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
