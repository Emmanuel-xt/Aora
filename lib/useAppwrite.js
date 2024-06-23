import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useApprite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      console.log("response ==> ");
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData()

  console.log("Data ==> fetched ");
  return { data , isLoading , refetch };
};

export default useApprite;
