import { ECommerce, Interfaces } from 'doodle-icons'

const Navbar = () => {
  return (
    <div className="flex h-12 items-center justify-between p-4">
      <span>
        <img src="/icons/amphibien-slug-icon.svg" alt="Amphibien" />
      </span>
      <span className="flex items-center gap-4">
        <ECommerce.Location className="h-8 w-8" />
        <Interfaces.User className="h-8 w-8" />
      </span>
    </div>
  )
}

export default Navbar
