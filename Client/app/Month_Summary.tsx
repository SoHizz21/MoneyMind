import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native";

interface Summary {
  id: number;
  user_id: number;
  monthly_savings_goal: number;
  monthly_current_savings: number;
  total_savings_goal: number;
  current_savings: number;
  income: number ;
  expense: number ;
}

const mockSummary: Summary = {
  id: 1,
  user_id: 101,
  monthly_savings_goal: 2000,
  monthly_current_savings: 2000,
  total_savings_goal: 100000,
  current_savings: 25000,
  income:200000,
  expense:170000,
};

export default function MonthSummary() {
  const theme = useColorScheme();
  const componentcolor = theme === "dark" ? "!bg-[#181818]" : "!bg-[#d8d8d8]";
  return (
    <ThemedSafeAreaView>
      <ThemedView className={`items-center flex-col justify-center w-96 my-5 ${componentcolor} mx-auto rounded-lg`}>
        <ThemedView
          className={`items-center flex-row bg-transparent justify-between w-80 m-5 p-5  mx-auto rounded-lg`}
        >
          <ThemedText className="text-3xl">Goal</ThemedText>
          <ThemedText className="text-2xl">
            {mockSummary.monthly_current_savings}/
            {mockSummary.monthly_savings_goal}
          </ThemedText>
        </ThemedView>
        <ThemedText className="text-3xl py-6">กราฟ</ThemedText>
      </ThemedView>

      <ThemedView className="flex-row gap-3 justify-between mx-auto rounded-lg">
        <ThemedView className={`p-5 flex-col ${componentcolor} rounded-lg `}>
            <ThemedText className="text-2xl">Total Income</ThemedText>
            <ThemedText className="text-2xl">{mockSummary.income}</ThemedText>
        </ThemedView>
        <ThemedView className={`p-5 flex-col ${componentcolor} rounded-lg `}>
            <ThemedText className="text-2xl">Total Expense</ThemedText>
            <ThemedText className="text-2xl">{mockSummary.expense}</ThemedText>
        </ThemedView>
      </ThemedView>

      <View className={`items-center flex-col justify-center w-96 my-5 ${componentcolor} mx-auto rounded-lg`}>
        <ThemedText className="text-[108px]">กราฟ</ThemedText>
      </View>
      <View className={`items-center flex-col justify-center w-96 my-1 mx-auto rounded-lg`}>
        <ThemedText className="text-2xl">You Already Saved 0.1 %</ThemedText>
      </View>
      <View className={`items-center flex-col justify-center w-96 my-2 mx-auto rounded-lg`}>
        <ThemedText className="text-6xl">{mockSummary.total_savings_goal}</ThemedText>
      </View>
      <View className={`items-center flex-col justify-center w-96 my-1 mx-auto rounded-lg`}>
        <ThemedText className="text-2xl">Remaining</ThemedText>
      </View>
      <View className={`items-center flex-col justify-center w-96 my-1 mx-auto rounded-lg`}>
        <ThemedText className="text-2xl">needed 31 year 11 month to go</ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
}
