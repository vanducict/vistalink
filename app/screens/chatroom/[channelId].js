import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Stack, useGlobalSearchParams} from 'expo-router';
import {StreamChat} from 'stream-chat';
import {Channel, Chat, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider,} from 'stream-chat-expo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ChatRoom = () => {
    const {channelId} = useGlobalSearchParams(); // Extract channelId from route params
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    // StreamChat instance
    const chatClient = StreamChat.getInstance('vxujf6n9668d');
    const insets = useSafeAreaInsets();

    useEffect(() => {
        let active = true; // Prevent updates to unmounted components

        const fetchChannel = async () => {
            try {
                if (channelId) {
                    // Check if channel is already in cache
                    const cachedChannel = chatClient.activeChannels[channelId];
                    if (cachedChannel) {
                        setChannel(cachedChannel);
                    } else {
                        const fetchedChannel = chatClient.channel('messaging', channelId);
                        await fetchedChannel.watch();
                        setChannel(fetchedChannel);
                    }
                }
            } catch (error) {
                console.error('Error fetching channel:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannel();

        // Cleanup function to stop watching the channel
        return () => {
            active = false; // Mark component as unmounted
            if (channelId) {
                const cleanupChannel = chatClient.channel('messaging', channelId);
                cleanupChannel.stopWatching().catch(console.error);
            }
        };
    }, [channelId, chatClient]);

    // If still loading, show a loading spinner
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    // If no channel is found, show an error message
    if (!channel) {
        return <Text style={{textAlign: 'center', marginTop: 20}}>Channel not found. Please try again.</Text>;
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    headerTitle: () => (
                        <Text>{channelId}</Text>
                    ),
                }}
            />
            <SafeAreaView style={{flex: 1}}>
                <ChatOverlayProvider bottomInset={insets.bottom} topInset={insets.top}>
                    <Chat client={chatClient}>
                        <Channel channel={channel}>
                            <View style={StyleSheet.absoluteFill}>
                                <MessageList/>
                                <MessageInput/>
                            </View>
                        </Channel>
                    </Chat>
                </ChatOverlayProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default ChatRoom;
