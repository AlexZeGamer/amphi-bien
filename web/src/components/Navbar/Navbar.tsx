import { ECommerce, Interfaces } from 'doodle-icons'

import { Link, routes } from '@redwoodjs/router'

const Navbar = () => {
  return (
    <div className="flex h-12 items-center justify-between p-4">
      <span>
        <Link to={routes.home()}>
          <img src="/icons/amphibien-slug-icon.svg" alt="Amphibien" />
        </Link>
      </span>
      <span className="flex items-center gap-4">
        <Link to={routes.nearby()}>
          <ECommerce.Location className="h-8 w-8" />
        </Link>
        <Interfaces.User className="h-8 w-8" />
      </span>
    </div>
  )
}

export default Navbar
