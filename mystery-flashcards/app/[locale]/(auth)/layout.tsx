import Card from "@/components/Card";
import AuthTitle from "@/components/auth/AuthTitle";

async function AuthLayout({ children }: any) {

    return (
        <div className="m-5 w-full ">
            <Card className="mx-5 md:mx-auto md:w-[700px] sm:h-[80vh]" title={<AuthTitle />}>
                {children}
            </Card>
        </div>
    )
}

export default AuthLayout