export function GetTwitterId(url:string) {
    const withoutDomain = url.replace(/https:\/\/(twitter\.com|x\.com)\//, '');
    const urlParts = withoutDomain.split("?");
    if (urlParts.length > 1) {
        const baseURL = urlParts[0];
        const cleanedURL = baseURL;
        return cleanedURL;
    } else {
        return withoutDomain;
    }
}