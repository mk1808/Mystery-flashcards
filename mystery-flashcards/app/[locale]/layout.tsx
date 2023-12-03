import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function LocaleLayout({ children, params }: any) {
   // { params }: { params: { locale: string } }
    return (<>
        <Header locale={params.locale}/>
        <main className="flex min-h-screen flex-col items-center justify-between">
            {children}
        </main>
        <Footer />
    </>
    )
}