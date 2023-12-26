import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProvideLocale from "@/components/ProvideLocale";
import AlertManager from "@/components/alerts/AlertManager";
import { fetchDictionary } from "@/dictionaries/dictionaries";

async function LocaleLayout({ children, params }: { children: any, params: { locale: string } }) {
    const dictionary = await fetchDictionary(params.locale);

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                {children}
            </main>
            <Footer />
            <AlertManager />
            <ProvideLocale dictionary={dictionary} locale={params.locale} />
        </>
    )
}

export default LocaleLayout