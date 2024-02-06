import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(isMenuOpen)
 
  };
  const navItems = [
    {path: "/", title: "Start a search"},
    {path: "/my-job", title: "My-jobs"},
    {path: "/salary", title: "Salary Estimated"},
    {path: "/post-job", title: "Post A Job"},
  ]
  return (
    <header>
      <nav>
        <a href="/" className="flex items-center gap-0 text-2xl text-black">
         <img src="./images/job logo.jpg" alt="Logo of my website" className="size-20"></img>
          <span>Portal</span>
        
        </a>
        {/* nav items for large devices */}
        <ul className="md: flex gap-12">
          {
            navItems.map(({path, title}) => (
              <li key={path} className="text-base">
                <NavLink
                    to={path}
                    className={({ isActive }) => isActive ? "active" : ""
                    }
                  >
                    {title}
                  </NavLink>
              </li>
            ) )
          }
        </ul>

      </nav>
    </header>
  )
}

export default Navbar