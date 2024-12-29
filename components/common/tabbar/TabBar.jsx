import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./TabBar.style";
import icons from "../../../constants/icons"; // Import your icons

const TabBar = ({state, descriptors, navigation}) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                // Dynamically choose the icon based on the route name
                let iconSource;
                let iconName;
                switch (route.name) {
                    case 'Home':
                        iconSource = icons.home;
                        iconName = 'Home';
                        break;
                    case 'MyProfile':
                        iconSource = icons.myProfile;
                        iconName = 'My Profile';
                        break;
                    case 'Chats':
                        iconSource = icons.chats;
                        iconName = 'Chats';
                        break;
                    case 'MyLinks':
                        iconSource = icons.links;
                        iconName = 'My Links';
                        break;
                    default:
                        iconSource = null;
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        <Image
                            source={iconSource} // Use the selected icon source
                            resizeMode={"contain"}
                            style={styles.tabIcon}
                        />
                        <Text style={[styles.tabText, isFocused && styles.focusedText]}>
                            {iconName}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;
