import Cookies from "js-cookie";

export function removeUserCookie() {
    Cookies.remove("user");
}
