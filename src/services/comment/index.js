import Cookies from "js-cookie";

export const addCommentToProduct = async (formData) => {
  try {
    console.log("Received comment data:", formData);
    const res = await fetch("/api/comment/add-comment-to-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllComments = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/comment/all-comment-items`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
