import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, Text, TextInput, View} from 'react-native';
import {StreamChat} from 'stream-chat';
import {Stack, useRouter} from 'expo-router';
import {ChannelList, Chat, OverlayProvider} from 'stream-chat-expo';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import images from "../../../constants/images";
import styles from "./ChatScreen.style";
import Loading from "../../../components/common/loading/Loading";
// Your StreamChat instance
const chatClient = StreamChat.getInstance('vxujf6n9668d');

// Helper to generate random chat room IDs
const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Filters and options for the ChannelList
const filters = {};
const options = {limit: 20, messages_limit: 30};

const ChatsScreen = ({route}) => {
    const {userId, userName} = route.params;
    const [channelsKey, setChannelsKey] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [chatRoomName, setChatRoomName] = useState('');
    const [chatRoomDescription, setChatRoomDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const connectStreamUser = async () => {
            try {
                setLoading(true);
                await chatClient.connectUser(
                    {id: userId, name: userName},
                    chatClient.devToken(userId),
                );
                setChannelsKey(prevKey => prevKey + 1); // Trigger re-render by incrementing the key
            } catch (err) {
                console.error('Error connecting user:', err);
            }
        };

        if (!chatClient.userID) {
            connectStreamUser().then(r => r);
            setLoading(false);
        }
    }, [userId, userName]);

    // Create a new chat room
    async function createChatRoom() {
        const channel = chatClient.channel('messaging', makeid(9), {
            name: chatRoomName,
            description: chatRoomDescription,
        });

        try {
            await channel.create();
            setModalVisible(false);
            setChatRoomName('');
            setChatRoomDescription('');
            setChannelsKey(prevKey => prevKey + 1); // Refresh channels
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <GestureHandlerRootView>
            <Stack.Screen
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Image
                            source={images.link}
                            style={{width: 40, height: 40, resizeMode: 'contain'}}
                        />
                    ),
                }}
            />
            <OverlayProvider>
                <Loading loading={loading}/>
                <Chat client={chatClient}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Create Chat Room</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setChatRoomName}
                                    value={chatRoomName}
                                    placeholder="Chat Room Name"
                                />
                                <TextInput
                                    style={styles.inputMultiline}
                                    onChangeText={setChatRoomDescription}
                                    value={chatRoomDescription}
                                    multiline
                                    numberOfLines={4}
                                    maxLength={100}
                                    placeholder="Short Description"
                                />
                                <View style={styles.buttonContainer}>
                                    <Pressable style={[styles.button, styles.buttonCancel]} onPress={handleCancel}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={[styles.button, styles.buttonClose]} onPress={createChatRoom}>
                                        <Text style={styles.textStyle}>Create Room</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Channel List Component */}
                    <ChannelList
                        key={channelsKey} // Use channelsKey to trigger re-render
                        filters={filters}
                        options={options}
                        onSelect={(channel) => {
                            // Use `router.push` to navigate to the chat room page
                            router.push(`/screens/chatroom/${channel.id}`, {
                                params: {channel, chatClient}, // Pass the channel and chatClient as params
                            });
                        }}
                    />
                </Chat>
            </OverlayProvider>
        </GestureHandlerRootView>

    );
};


export default ChatsScreen;
