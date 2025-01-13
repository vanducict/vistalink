import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useGlobalSearchParams} from 'expo-router'; // Import for dynamic route params
import {StreamChat} from 'stream-chat';
import {Channel, Chat, MessageInput, MessageList, OverlayProvider as ChatOverlayProvider,} from 'stream-chat-expo';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ChatRoom = () => {
    const {channelId} = useGlobalSearchParams(); // Extract channelId from the route params
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize the StreamChat client
    const chatClient = StreamChat.getInstance('vxujf6n9668d');

    useEffect(() => {
        // Fetch and initialize the channel
        const fetchChannel = async () => {
            try {
                const fetchedChannel = chatClient.channel('messaging', channelId);  // Specify the channel type and ID
                await fetchedChannel.watch();  // Watch the channel for updates
                setChannel(fetchedChannel);  // Set the channel state
                setLoading(false);  // Stop loading when the channel is fetched
            } catch (error) {
                console.error('Error fetching channel:', error);
                setLoading(false);  // Stop loading even on error
            }
        };

        if (channelId) {
            fetchChannel();
        }

        // Cleanup on unmount
        return () => {
            if (channel) {
                channel.stopWatching(); // Stop watching the channel when leaving the chat
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
    const {bottom} = useSafeAreaInsets();

    // If no channel is found, show an error message
    if (!channel) {
        return <Text style={{textAlign: 'center', marginTop: 20}}>Failed to load channel. Please try again.</Text>;
    }

    return (


        <SafeAreaView>
            <ChatOverlayProvider bottomInset={bottom} topInset={0}>
                <Chat client={chatClient}>
                    <Channel channel={channel} keyboardVerticalOffset={0}>
                        <View style={StyleSheet.absoluteFill}>
                            <MessageList/>
                            <MessageInput/>
                        </View>
                    </Channel>
                </Chat>
            </ChatOverlayProvider>
        </SafeAreaView>
    );
};

export default ChatRoom;
