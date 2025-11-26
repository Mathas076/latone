import React from 'react';
import { Text } from 'react-native';
interface CustomTextProps{
    variant:"small"|"medium"|"large";
    dark?:boolean;
    children: React.ReactNode;
}

const CustomText = ({variant, dark =false, children}:CustomTextProps) => {
  return (
     <Text className={styleSelector(variant,dark)}>
        {children}
    </Text>
 )
}

function styleSelector(variant:any,dark:boolean){
    let style = ""
    if(dark == true){
        style += "text-[#9F211F] "
    }else{
        style += "text-white "
    }
    
    switch(variant){
        case "small":
            return style + "font-semibold text-sm" ;
        case "medium":
            return style + "font-semibold text-base" ;
        case "large":
            return style + " font-semibold text-xl" ;
    }
}

export default CustomText