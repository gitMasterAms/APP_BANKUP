// import React, {forwardRef, LegacyRef} from "react";

// import { View, Text, TextInput, TextInputProps } from "react-native";
// import {style} from "./styles";
// import { colors } from "../../global/colors";

// import {MaterialIcons, FontAwesome, Octicons} from '@react-native/vector-icons'

// type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
//                      React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
//                      React.ComponentType<React.ComponentProps<typeof Octicons>>

// type Props = TextInputProps & {
//     IconLeft?: IconComponent,
//     IconRigth?: IconComponent,
//     iconLeftName?: string,
//     IconRigth?: string,
//     title?: String,
//     onIconLeftPress?: () => void,
//     onIconRigthPress?: () => void
// }

// export const Input = forwardRef((Props:Props, ref: React.ForwardedRef<TextInput> | null)=>{
//     return(
//         <>
//             <Text>Input</Text>
//             <View>
//                 <TextInput/>
//                 <MaterialIcons />
//             </View>
//         </>
//     )
// })