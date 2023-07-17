import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Books", to: "books", current: false },
  { name: "About", to: "about", current: false },
  { name: "Contact", to: "contact", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const token: any = window.localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [user, setUser] = useState(token);

  console.log("user", user);

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const decoded = jwtDecode(token); // Returns with the JwtPayload type
    console.log("decoded", decoded);
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    setUser("");
  };
  return (
    <div>
      <div>
        <Disclosure as="nav" className="bg-indigo-700">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        <Link to="/">
                          <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                            Home
                          </button>
                        </Link>

                        {user && (
                          <>
                            <Link to="/books">
                              <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                                Book
                              </button>
                            </Link>
                            <Link to="addNewBook">
                              <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                                Add New Book
                              </button>
                            </Link>
                          </>
                        )}

                        <Link to="/about">
                          <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                            About
                          </button>
                        </Link>
                        <Link to="/contact">
                          <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                            Contact
                          </button>
                        </Link>

                        {user ? (
                          <button
                            onClick={handleLogOut}
                            className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out"
                          >
                            Sign out
                          </button>
                        ) : (
                          <Link to="/login">
                            <button className="text-white uppercase shadow-gray-300 hover:text-red-500 px-3 py-2 rounded-r-full text-base subpixel-antialiased font-semibold transition delay-150 duration-300 ease-in-out">
                              Login
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex hidden sm:block rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden ">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Navbar;
