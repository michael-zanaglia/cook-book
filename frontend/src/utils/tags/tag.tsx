import { LuCakeSlice } from "react-icons/lu";
import { GiHotMeal } from "react-icons/gi";
import { PiTreePalmFill } from "react-icons/pi";
import { TbHexagonNumber1, TbChartBarPopular, TbPlant2 } from "react-icons/tb";
import { BiSolidDrink } from "react-icons/bi";
import { GiHealthIncrease } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
import { MdElectricBolt } from "react-icons/md";
import { GiBread } from "react-icons/gi";
import { GiNoodles } from "react-icons/gi";
import { IoMdTrendingDown } from "react-icons/io";
import { LuMilkOff } from "react-icons/lu";
import { LuWheatOff } from "react-icons/lu";
import { GiPartyPopper } from "react-icons/gi";
import { GiCroissant } from "react-icons/gi";

export const tags = (tag: string) => {
    switch (tag.toUpperCase()) {
        case 'DESSERT':
            return <LuCakeSlice />;
        case 'PLAT':
            return <GiHotMeal />;
        case 'ENTREE':
            return <GiMeal />;
        case 'EXOTIQUE':
            return <PiTreePalmFill />;
        case 'NUMBER_ONE':
            return <TbHexagonNumber1 />;
        case 'MOST_POPULAR':
            return <TbChartBarPopular />;
        case 'DRINK':
            return <BiSolidDrink />;
        case 'VEGAN': 
            return <TbPlant2 />;
        case 'HEALTH': 
            return <GiHealthIncrease />;
        case 'FAST': 
            return <MdElectricBolt />;
        case 'CHEAP': 
            return <IoMdTrendingDown />;
        case 'FRENCH': 
            return <GiBread />;
        case 'ASIAN': 
            return <GiNoodles />;
        case 'LACTOSE_FREE': 
            return <LuMilkOff  />;
        case 'NO_GLUTEN': 
            return <LuWheatOff />;
        case 'BIG_MOMENT': 
            return <GiPartyPopper />;
        case 'BREAKFAST': 
            return <GiCroissant />;
    }
}