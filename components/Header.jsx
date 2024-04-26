
import React, { useState, useEffect } from 'react';
import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";


const Header = () => {
    const [mobileMenu, setMoblieMenu]=useState(false);
    const [showCatMenu, setShowCatMenu]=useState(false);
    const [show, setShow]=useState("transalte-y-0");
    const [lastScrollY, setLastScrollY]=useState(0);
    const [categories, setCategories] = useState(null);
    const { cartItems } = useSelector((state) => state.cart);

    /*Function for controling navbar start*/ 
    const controlNavbar = () => {
        if(window.scrollY > 200 ){
            if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("-translate-y-[80px]");
        } else {
            setShow("shadow-sm")
        }}
        else {
          setShow("translaye-y-0")
        }
    };

    useEffect(()=>{
        window.addEventListener("scroll",controlNavbar);
        return () => {
            window.removeEventListener("scroll",controlNavbar);
        };
    }, [lastScrollY]);
     /*Function for controling navbar end*/

     useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await fetchDataFromApi("/api/categories?populate=*");
        setCategories(data);
    };

    return (
        /* In the below header I used 'sticky' in css alhough felt like didn't needed  */
    <header className= {`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between
     z-20 top-20 transition-transform duration-300 ${show}`}> 
        <Wrapper classname="h-[60px] flex z-20 justify-between items-center">
            <Link href="/">
            <img src="/logo.svg" className="w-[40px] md:w-[60px]" alt="logo" />
            </Link> 
            <Menu 
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}/>
             
            {mobileMenu && (
                <MenuMobile 
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMoblieMenu={setMoblieMenu}
            categories={categories}
            />
            )}
            
            <div className="flex items-center gap-2 text-black">
              {/* Heart Icon start */}
               {/* <div className="w-8 md:w-12 h-8 md:h-12  rounded-full flex justify-center items-center
                 hover:bg-black/[0.05] cursor-pointer relative">
                    <IoMdHeartEmpty className="text-[15px] md:text-[20px]" />
                    <div className="h-[14px] md:text-h-[18px] min-w-[14px] md:w-w-[18px] rounded-full 
                    bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px]
                    flex justify-center items-center px-[2px] md:px-[5px] ">51</div>
            </div> */}
              {/* Heart Icon End */}
              {/* Cart Icon start */}
              <Link href="/cart">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BsCart className="text-[15px] md:text-[20px]" />
                            {cartItems.length > 0 && (
                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {cartItems.length}
                                </div>
                            )}
                        </div>
                    </Link>
              
              {/* Cart Icon End */}
            
              {/* Bar menu Icon start */}
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center
               hover:bg-black/[0.05] cursor-pointer realtive -mr-2">
                {mobileMenu ? (
                       <VscChromeClose className="text-[16px] "
                       onClick={() => setMoblieMenu(false)}/>
                ) : (
                    <BiMenuAltRight className="text-[20px]"
                    onClick={() => setMoblieMenu(true)}/>
                )

                }
               </div>
               {/* Bar menu Icon end */}
            </div>
         </Wrapper>
    </header>
    );
};

export default Header;
