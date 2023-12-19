import TrainingSidebar from "@/components/learn/training/TrainingSidebar";
import { fetchDictionary } from "@/dictionaries/dictionaries";

export default async function LearnTrainingSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return <TrainingSidebar dictionary={dictionary} />
}