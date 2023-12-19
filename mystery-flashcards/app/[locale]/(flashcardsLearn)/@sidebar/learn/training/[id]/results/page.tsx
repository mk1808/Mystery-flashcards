import TrainingResultsSidebar from "@/components/learn/training/TrainingResultsSidebar";
import { fetchDictionary } from "@/dictionaries/dictionaries";


export default async function LearnTrainingResultsSidebar({ params }: { params: { id: string, locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return <TrainingResultsSidebar dictionary={dictionary} />
}