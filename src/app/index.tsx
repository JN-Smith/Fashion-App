import { Image } from "expo-image";
import { Text, View } from "react-native";

import { images } from "../../constants/images";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-[#3B0710] px-6">
      <Image
        accessibilityLabel="Sifa monogram"
        contentFit="contain"
        source={images.sifaMonogram}
        style={{ height: 176, width: 176 }}
      />
      <View className="mt-8 items-center">
        <Text className="serif text-5xl font-bold tracking-[2px] text-[#F6D489]">
          Sifa
        </Text>
        <Text className="mt-3 text-base tracking-wide text-[#FFF0F2]">
          The way she wears it
        </Text>
      </View>
    </View>
  );
}
