export const uploadToImgbb = async (base64Image: string): Promise<string | ""> => {
    try {
        const formData = new FormData();
        formData.append("image", base64Image.split(",")[1]); // Remove the data:image/png;base64, part

        const response = await fetch(`https://api.imgbb.com/1/upload?key=ed67a942812ea90bf6e8f65a6c43c091`, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            alert("Image Uploaded");
            console.log(data.data.url);
            return data.data.url;
        } else {
            alert("Couldn't upload the image properly");
            return "";
        }
    } catch (error) {
        console.error("Error uploading image to imgbb", error);
        return "";
    }
};


export function pad(num: string | number, size: number) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}