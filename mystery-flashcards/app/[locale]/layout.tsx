import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProvideLocale from "@/components/ProvideLocale";
import AlertManager from "@/components/alerts/AlertManager";
import { fetchDictionary } from "@/dictionaries/dictionaries";


export default async function LocaleLayout({ children, params }: any) {
    const dictionary = await fetchDictionary(params.locale);

    return (<>
        <Header locale={params.locale} dictionary={dictionary} />
        <main className="flex min-h-screen flex-col items-center justify-between">
            {children}
        </main>
        <Footer locale={params.locale} dictionary={dictionary} />
        <AlertManager />
        <ProvideLocale dictionary={dictionary} locale={params.locale} />
    </>
    )
}