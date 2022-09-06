import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';

const FeaturedRow = ({id, title, description}) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]-> {
                        ...,
                    },
                    type-> {
                        name
                    }
                }
            }[0]
        `, { id }).then((data) => {
            setRestaurants(data?.restaurants);     
        })
    }, []);

  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="text-bold text-lg">
                {title}
            </Text>
            <ArrowRightIcon color="#00CCBB"/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
            {/* RestaurantCards... */}
            {
                restaurants?.map(restaurant => (
                    <RestaurantCard 
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        genre={restaurant.type?.name}
                        rating={restaurant.rating}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        lat={restaurant.lat}
                        long={restaurant.long}
                    />
                ))
            }
        </ScrollView>
    </View>
  )
}

export default FeaturedRow