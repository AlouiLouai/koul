import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Home, PieChart, User as UserIcon, Camera } from 'lucide-react-native';
import { GlassView } from '@/components/GlassView';
import { useTheme } from '@/theme/ThemeContext';
import { TabButton } from '@/components/TabButton';

export function TabBar({ state, navigation }: any) {
    const { mode } = useTheme();

    return (
        <View style={tabStyles.container}>
            <GlassView
                style={[
                    tabStyles.dockContainer,
                    {
                        backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.6)',
                        borderColor: mode === 'dark' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                    }
                ]}
                intensity={mode === 'dark' ? 90 : 60}
                borderRadius={45}
            >
                <View style={tabStyles.innerContainer}>
                    {state.routes.map((route: any, index: number) => {
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        let icon;
                        if (route.name === 'index') icon = Home;
                        else if (route.name === 'scan') icon = Camera;
                        else if (route.name === 'stats') icon = PieChart;
                        else if (route.name === 'profile') icon = UserIcon;

                        return (
                            <TabButton
                                key={route.key}
                                icon={icon}
                                isActive={isFocused}
                                onPress={onPress}
                            />
                        );
                    })}
                </View>
            </GlassView>
        </View>
    );
}

const tabStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 18,
        left: 20,
        right: 20,
        alignItems: 'center',
        zIndex: 100,
    },
    dockContainer: {
        width: '100%',
        maxWidth: 360,
        paddingHorizontal: 8,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 12,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    highlightCircle: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
    }
});