import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
    
const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }))
    }, [dispatch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

  return (
    <>
    <BasketIcon></BasketIcon>

    <SafeAreaView className="bg-white pt-2" style={style.container}>
        <ScrollView className="relative">
            <View>
                <Image 
                    source={{
                        uri: urlFor(imgUrl).url()
                    }}
                    className="w-full h-56 bg-gray-300 p-4"
                />
                <TouchableOpacity 
                    onPress={navigation.goBack}
                    className="absolute top-5 left-5 bg-gray-100 rounded-full">
                    <ArrowLeftIcon size={30} color="#00CCBB" />
                </TouchableOpacity>
            </View>

            <View className="bg-white">
                <View className="px-4 pt-4">
                    <Text className="text-3xl font-bold">{title}</Text>
                    <View className="flex-row space-x-2 my-1">
                        <View className="flex-row items-center space-x-1">
                            <StarIcon color="green" opacity={0.5} size={22} />
                            <Text className="text-xs text-gray-500">
                                <Text className="text-green-500">{rating}</Text> . {genre}
                            </Text>
                        </View>

                        <View className="flex-row items-center space-x-1">
                            <MapPinIcon size={22} color="gray" opacity={0.4} />
                            <Text className="text-xs text-gray-500">
                                Nearby . {address}
                            </Text>
                        </View>

                        <Text className="text-gray-500 py-2">
                            {short_description}
                        </Text>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 py-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={25} />
                        <Text className="flex-1 text-md font-bold">
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="bg-gray-100 pb-36">
                    <Text className="px-4 pt-5 mb-3 font-bold text-xl">Menu</Text>
                    {
                        dishes?.map(dish => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                image={dish.image}
                                price={dish.price}
                            ></DishRow>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    </>
  )
}

const style = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight
    }
  });

export default RestaurantScreen;