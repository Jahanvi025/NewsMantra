import { useRef, useState, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react"
import logo from "../../assets/images/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user")
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error)
      return null
    }
  })


  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen((prev) => !prev)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsOpen(false)
      }
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-dropdown")
      ) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isProfileDropdownOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user")
      setUser(stored ? JSON.parse(stored) : null)
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const newspapers = [
    { name: "Times of India", href: "/news/times-of-india" },
    { name: "The Hindu", href: "/news/the-hindu" },
    { name: "Indian Express", href: "/news/indian-express" },
    { name: "Hindustan Times", href: "/news/hindustan-times" },
    { name: "Economic Times", href: "/news/economic-times" },
  ]

  const NavItem = ({ to, children, onClick = () => { } }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-[Supreme] text-[15px] font-normal text-black transition-colors hover:bg-neutral-200 px-4 py-2 rounded-sm ${isActive ? "active-link" : ""
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  )

  const AuthButton = ({ variant, onClick, children }) => (
    <button
      className={`font-[Supreme] text-[15px] font-normal  ${variant === "primary"
          ? "text-white bg-black border border-neutral-200 transition-colors hover:text-[#F7374F]"
          : "text-black border border-neutral-200 transition-colors hover:bg-neutral-100"
        } px-4 py-2 rounded-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row h-16 items-center justify-between px-4 md:px-14">
        <div className="flex items-center space-x-2">
          <button
            className="lg:hidden p-2 transition-transform duration-300 ease-in-out menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-black transition-transform duration-300" />
            )}
          </button>

          <Link
            to="/"
            className="flex items-center justify-between space-x-2 py-5"
          >
            <img
              className="w-9 h-9"
              src={logo || "/placeholder.svg"}
              alt="icon"
            />
            <span className="font-bold text-lg text-black font-[Supreme]">
              NewsMantra
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-row space-x-2">
          <NavItem to="/">Home</NavItem>

          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `font-[Supreme] text-[15px] font-normal text-black transition-colors 
                hover:bg-neutral-200 px-4 py-2 rounded-sm flex items-center 
                ${isActive ? "active-link bg-neutral-300" : ""}`
              }
            >
              <span>All News</span>
              <div className="relative w-3 h-3 ml-1 mt-0.5">
                <ChevronDown className="absolute top-0 left-0 w-3 h-3 transition-transform duration-700 group-hover:rotate-180" />
              </div>
            </NavLink>

            {isDropdownOpen && (
              <div className="absolute top-10 grid-cols-2 grid -left-22 mt-2 p-2 h-36 w-xl bg-white border-1 border-neutral-300 shadow-lg rounded-lg z-50">
                {newspapers.map((newspaper) => (
                  <Link
                    key={newspaper.href}
                    to={newspaper.href}
                    className="flex items-center px-8 py-2 text-sm text-black rounded-lg hover:bg-gray-200 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {newspaper.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavItem to="/famous-stories">Famous News</NavItem>
          <NavItem to="/articles">Articles</NavItem>
          <NavItem to="/about">About</NavItem>
        </nav>

        <div className="relative space-x-2">
          {user ? (
            <div className="relative inline-block text-left profile-dropdown">
              <button
                onClick={toggleProfileDropdown}
                className="flex flex-row gap-2 font-[Supreme] text-sm md:text-[15px] font-normal text-black border border-neutral-200 transition-colors hover:bg-neutral-100 px-4 py-2 rounded-lg"
              >
                Account <User className="w-5 h-5" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/profile")
                      setIsProfileDropdownOpen(false)
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user")
                      setUser(null)
                      setIsProfileDropdownOpen(false)
                      navigate("/login")
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex md:gap-2 ">
              <AuthButton variant="outline" onClick={() => navigate("/login")}>
                Login
              </AuthButton>
              <AuthButton
                variant="primary"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </AuthButton>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className="lg:hidden">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={closeMenu}
          />
        )}

        <div
          className={`sidebar fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8"
                src={logo || "/placeholder.svg"}
                alt="icon"
              />
              <span className="font-bold text-lg text-black font-[Supreme]">
                NewsMantra
              </span>
            </div>
            <button onClick={closeMenu} className="p-1">
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <nav className="flex flex-col p-4 bg-white">
            <NavItem to="/" onClick={closeMenu}>
              Home
            </NavItem>

            <div className="relative py-2">
              <div
                className="font-[Supreme] text-[15px] text-black hover:bg-neutral-200 px-4 py-2 rounded-sm flex items-center justify-between cursor-pointer"
                onClick={toggleDropdown}
              >
                <span>All News</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </div>

              <div
                className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${isDropdownOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
              >
                {newspapers.map((newspaper) => (
                  <Link
                    key={newspaper.href}
                    to={newspaper.href}
                    className="block font-[Supreme] text-sm text-black hover:bg-neutral-100 px-4 py-2 rounded-sm"
                    onClick={closeMenu}
                  >
                    {newspaper.name}
                  </Link>
                ))}
              </div>
            </div>

            <NavItem to="/famous-stories" onClick={closeMenu}>
              Famous News
            </NavItem>
            <NavItem to="/articles" onClick={closeMenu}>
              Articles
            </NavItem>
            <NavItem to="/about" onClick={closeMenu}>
              About
            </NavItem>

            <div className="mt-6 flex flex-col space-y-2 px-4">
              {user ? (
                <>
                  <AuthButton
                    variant="outline"
                    onClick={() => {
                      navigate("/profile")
                      closeMenu()
                    }}
                  >
                    Profile
                  </AuthButton>
                  <AuthButton
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem("user")
                      setUser(null)
                      closeMenu()
                      navigate("/login")
                    }}
                  >
                    Logout
                  </AuthButton>
                </>
              ) : (
                <>
                  <AuthButton
                    variant="outline"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </AuthButton>
                  <AuthButton
                    variant="primary"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </AuthButton>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
