import Card from "@/components/Card";
import AuthTitle from "@/components/auth/AuthTitle";
import { fetchDictionary } from "@/dictionaries/dictionaries";

export default async function AuthLayout({ children, params }: any) {
    const dictionary = await fetchDictionary(params.locale);
    
    return (
        <div className="my-5">
            <Card title={<AuthTitle dictionary={dictionary} />}>
                {children}
            </Card>
        </div>
    )
}