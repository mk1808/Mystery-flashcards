import Card from "@/components/Card";
import AuthTitle from "@/components/auth/AuthTitle";

export default function AuthLayout({ children, params }: any) {
    
    return (
        <div className="my-5">
            <Card title={<AuthTitle locale="" />}>
                {children}
            </Card>
        </div>
    )
}