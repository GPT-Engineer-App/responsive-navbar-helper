# responsive-navbar-helper

hey there can you make this navbar also responsive please : function NavBar() {
    const hover = "hover:text-submain transitions text-white";
    const hoverActive = "text-submain text-white";
    const [showAdminLinks, setShowAdminLinks] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
    const [userEmail, setUserEmail] = useState('');
    const [userRoles, setUserRoles] = useState([]);

    const Hover = ({ isActive }) => (isActive ? hoverActive : hover);

    useEffect(() => {
        const user = AuthService.getUser();
        if (user) {
            setUserEmail(user.email);
            setUserRoles(user.roles);
        }
    }, []);

    // Function to check if user has admin role
    const hasAdminRole = () => {
        return userRoles.includes('Creator');
    };

    // Function to handle logout
    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setUserEmail('');
        setUserRoles([]);
        window.location.href = '/categories';
    };

    return (
        <>
            <div className='bg-main shadow-md sticky top-0 z-20'>
                <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                    {/* Logo */}
                    <div className='col-span-1 lg:block hidden'>
                        <Link to="/">
                            <img src='/images/logo.png' alt="logo" className='w-full h-12 object-contain' />
                        </Link>
                    </div>
                    {/* search form */}
                    <div className='col-span-3'>
                        <form className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                            <button type='submit' className='bg-submain w-12 flex-colo h-12 rounded text-white'>
                                <FaSearch />
                            </button>
                            <input type='text' placeholder='Search' className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black' />
                        </form>
                    </div>
                    {/* menu */}
                    <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
                        <NavLink to="/categories" className={Hover}>
                            Categories
                        </NavLink>
                        {hasAdminRole() && (
                            <NavLink to="/admin/categories"
                                className={Hover}
                                onClick={() => setShowAdminLinks(!showAdminLinks)}
                            >
                                Admin
                            </NavLink>
                        )}
                        {isLoggedIn ? (
                            <div className="flex items-center">
                                <span className="mr-2 text-white">{userEmail}</span>
                                <button onClick={handleLogout} className={hover}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink to="/login" className={Hover}>
                                <CgUser className='w-8 h-8' />
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            {/* Conditional rendering for admin links */}
            {showAdminLinks && isLoggedIn && (
                <div className="bg-white shadow-md py-2">
                    <div className="container mx-auto px-2">
                        <ul className="flex justify-center">
                            <li className="mr-4">
                                <NavLink to="/admin/categories" className="text-black hover:text-submain">Category</NavLink>
                            </li>
                            <li className="mr-4">
                                <NavLink to="/admin/video-posts" className="text-black hover:text-submain">VideoPost</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar;


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/responsive-navbar-helper.git
cd responsive-navbar-helper
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
