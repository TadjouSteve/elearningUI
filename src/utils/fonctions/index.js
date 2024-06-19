import Cookies from "js-cookie";

export function removeUserCookie() {
    Cookies.remove("user");
}


export const getStatutColor=(statut)=>{
    let color='orange';
    switch (statut) {
        case "EN_ATTENTE":
            color='orange';
            break;
        case "PUBLIER":
            color='green';
            break;
        case "SUSPENDU": 
            color='red';
            break;
        default:
            color='blue';
            break;
    }

    return color;
}


export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            // Success message or action
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            // Error handling
            console.error('Failed to copy text: ', err);
        });
};

export const getFullUrlWithSuffix = (suffix) => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return `${url.protocol}//${url.host}${suffix}`;
};