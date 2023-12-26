import { redirect } from "next/navigation";

function NotFound() {
    redirect("not-found")
}

export default NotFound