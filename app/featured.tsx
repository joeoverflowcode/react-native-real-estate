import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppwrite } from "@/lib/useAppwrite";
import { getTopRatedProperties } from "@/lib/appwrite";
import { Card } from "@/components/Cards";
import { router } from "expo-router";

const featured = () => {
  const { data: topProperties, loading: topPropertiesLoading } = useAppwrite({
    fn: getTopRatedProperties,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  return (
    <SafeAreaView className="bg-white h-full">
        <View className="my-5">
        <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">Featured Properties</Text>
        </View>
        </View>
      <FlatList
        data={topProperties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Card  
          item={item} 
          onPress={() => handleCardPress(item.$id)} 
          />
        )}
        numColumns={1}
        // columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-5 p-5"
      />
    </SafeAreaView>
  );
};

export default featured;
