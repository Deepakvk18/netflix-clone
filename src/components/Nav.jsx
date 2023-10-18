import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import ProfilePopover from './ProfilePopOver'
import MigrateProfile from './MigrateProfile'
import netflixMobile from './assets/images/mobile-logo.webp'

function Nav({ links, background, searchParams }) {

    const [show, handleShow] = useState(false)
    const [searchBar, setSearchBar] = useState(false)
    const [migrateProfile, setMigrateProfile] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const navigate = useNavigate()
    

    const transitionNavBar = () => {
        if (window.scrollY > 50){
            handleShow(true)
        }else{
            handleShow(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    const showSearchBar = async () => {
        setSearchBar(true)
        // await new Promise((resolve) => setTimeout(resolve, 100));
        const element = document.getElementById('searchBar')
        element.focus()
    }

    const onKeyUp = (e) => {
        console.log('keyUp', e.key);
        if (e.key === 'Enter') {
            console.log(searchParam);
            navigate(`/search?${createSearchParams({query: e.target.value})}`)
        }
    }

  return (
    <nav className={`fixed flex w-full h-24 items-center py-5 z-3000 max-h-24 top-0 transition-all ease-in-out delay-150 duration-1000 ${show && 'bg-[#111]'} ${background && 'bg-[#111]'}`}>
        
        <div className='flex relative inset-0 space-between items-center w-1/2'>
            <Link href="/browse">
                <img
                    className='hidden sm:flex object-contain cursor-pointer ml-10 mr-5'
                    src={netflixLogo}
                    alt='logo'
                    width={150}
                />
            </Link>
            <Link href="/browse" className='flex sm:hidden'>
                <img
                    className='object-contain cursor-pointer ml-2 mr-2'
                    src={netflixMobile}
                    alt='logo'
                    width={40}
                />
            </Link>

            { links &&
                <div className='w-full hidden lg:flex ml-10 h-10 items-center'>
                    <div className={`justify-between  float-left`}>
                        <Link to='/browse' className='nav-links'>Home</Link>
                        <Link to='/discover/TV' className='nav-links'>TV Shows</Link>
                        <Link to='/discover/Movie' className='nav-links'>Movies</Link>
                        <Link to='/discover/Popular' className='nav-links'>New & Popular</Link>
                        <Link to='/myList' className='nav-links'>My List</Link>
                    </div>
                </div>
            }
                    
            { links &&
                <div className='flex sm:hidden text-white'>
                    <div>
                        <button id="hamburger-button" class="w-8 h-8 m-4 text-white">
                            {/* <!-- Add your hamburger icon here --> */}
                        </button>
                    </div>
                    <div id="hamburger-menu" class="hidden xl:flex items-center">
                        <Link href="/browse" class="nav-links">Home</Link>
                        <Link href="/discover/TV" class="nav-links">TV Shows</Link>
                        <Link href="/discover/Movie" class="nav-links">Movies</Link>
                        <Link href="/discover/Popular" class="nav-links">New & Popular</Link>
                        <Link href="/myList" class="nav-links">My List</Link>
                        <button id="search-button" class="ml-4 text-white">
                            {/* <!-- Add your search icon here --> */}
                        </button>
                        <a class="nav-links ml-4">Children</a>
                        <button id="bell-button" class="ml-4 text-white">
                            {/* <!-- Add your bell icon here --> */}
                        </button>
                    </div>
                    <div id="search-bar" class="hidden xl:flex">
                        <input
                            class="bg-[#333] text-white z-2000 rounded-sm h-10 w-full px-2 py-1 ring-slate-400 ring-2 mr-4"
                            id="searchBar"
                            value={searchParams ? searchParams : searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                            placeholder="Titles, people, genres"
                            onBlur={() => setSearchBar(false)}
                            onKeyUp={onKeyUp}
                        />
                    </div>

                </div>
            }
            </div>
             
             <div className='w-1/2 items-center justify-right'>
                { links && 
                    <div className='w-full justify-center items-center right-0'>
                        { searchBar && 
                        <input
                            className='absolute transition-all max-w-sm top-16 ease-out delay-150 duration-1000 bg-[#333] text-white rounded-sm h-10 px-2 py-1 ring-slate-400 ring-2'
                            id='searchBar'
                            value={searchParams ? searchParams : searchParam}
                            onChange={(e)=>setSearchParam(e.target.value)}
                            placeholder='Titles, people, genres'
                            onBlur={()=>setSearchBar(false)}
                            onKeyUp={onKeyUp}
                        />
                        }
                        <div className={``}>
                            <FontAwesomeIcon 
                                className='mr-4 cursor-pointer'
                                icon={faMagnifyingGlass} 
                                size='lg'
                                style={{color: "#fff",}} 
                                onClick={showSearchBar}
                            />
                            <Link onClick={()=>{}} className='cursor-pointer nav-links mr-4'>Children</Link>
                            <FontAwesomeIcon 
                                icon={faBell} 
                                className='mr-4 cursor-pointer'
                                style={{color: "#fff",}}
                                width={20}
                            />
                        </div>
                    </div>
                }
                <ProfilePopover setMigrateProfile={setMigrateProfile}/>
        </div>
        { migrateProfile && <MigrateProfile setMigrateProfile={setMigrateProfile}/> }
    </nav>
  )
}


export default Nav