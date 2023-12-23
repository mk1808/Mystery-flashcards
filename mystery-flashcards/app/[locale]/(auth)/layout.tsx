import Card from "@/components/Card";
import AuthTitle from "@/components/auth/AuthTitle";
import { fetchDictionary } from "@/dictionaries/dictionaries";

export default async function AuthLayout({ children, params }: any) {
    const dictionary = await fetchDictionary(params.locale);

    return (
        <div className="m-5 w-full ">
            <Card className="mx-5 md:mx-auto md:w-[700px] h-[80vh]" title={<AuthTitle dictionary={dictionary} />}>
                {children}
            </Card>
        </div>
    )
}