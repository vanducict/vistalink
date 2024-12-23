import {Stack, useRouter} from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../constants/theme";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import icons from "../constants/icons";
import {ScrollView, View} from "react-native";

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.profile}
                                         dimension='100%'
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu}
                                         dimension='100%'
                        />
                    ),
                    headerTitle: ""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: 16,
                    }}
                >
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

export default Home;
