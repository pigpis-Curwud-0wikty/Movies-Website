import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "../utils/axiosInstance";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/v1/${contentType}/trending`, {
          withCredentials: true,
        });
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error(`Error fetching trending ${contentType}:`, error);
        setError(error.response?.data?.message || "Failed to fetch trending content");
      } finally {
        setLoading(false);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, loading, error };
};
export default useGetTrendingContent;
