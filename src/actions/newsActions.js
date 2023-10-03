import { instanceAuth } from "../utils/api/instance";

export const addNews = async (endpoint, newsData, navigate) => {
  try {
    const { data } = await instanceAuth.post(endpoint, newsData);
    navigate("/my-news");
    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editNews = async (endpoint, newsData, navigate) => {
  try {
    const { data } = await instanceAuth.post(endpoint, newsData);
    navigate("/my-news");
    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNews = async (endpoint, user) => {
  try {
    const { data } = await instanceAuth.post(endpoint, user);
    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadFile = async (fileRaw) => {
  try {
    const { data } = await instanceAuth.post("/news/uploadFile", fileRaw);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneNews = async (newsId) => {
  try {
    const { data } = await instanceAuth.get(`/news/${newsId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNews = async (newsId, navigate) => {
  try {
    const { data } = await instanceAuth.delete(`/news/${newsId}`);
    navigate(0);
    return data;
  } catch (error) {
    console.log(error);
  }
};
