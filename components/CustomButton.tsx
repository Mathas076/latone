import React from 'react';
import { TouchableOpacity } from 'react-native';
import  CustomText  from './CustomText';

interface CustomButtonProps {
    onPress: () => void;
    children: string;
    size?: 'large' | 'medium' | 'small';
    variant?: 'primary' | 'secondary'|'disabled'|'link';
    className?: string;
}

export const CustomButton = ({
    onPress,
    children,
    size = 'medium',
    variant = 'primary',
    className = '',
}: CustomButtonProps) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'large':
                return 'p-4';
            case 'medium':
                return 'p-3';
            case 'small':
                return 'p-2';
            default:
                return 'p-3';
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-500 border-black';
            case 'secondary':
                return 'bg-white border-black';
            case 'disabled':
                return 'bg-gray-300 border-black';
            case 'link':
                return 'bg-blue-800 border-black';
            default:
                return 'bg-blue-500 border-black';
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary':
                return 'white';
            case 'secondary':
                return 'black';
            case 'disabled':
                return 'gray';
            case 'link':
                return 'blue';
            default:
                return 'black';
        }
    };


    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={variant === 'disabled'}
            className={
                `flex-1 rounded-md border 
                ${getSizeStyles()} ${getVariantStyles()}
                ${className}`
            }
        >
            <CustomText
                variant='large'
            >
                {children}
            </CustomText>
        </TouchableOpacity>
    );
};