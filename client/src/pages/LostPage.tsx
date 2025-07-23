import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import RateLimitedUI from "../components/RateLimitedPage/RateLimitedUI";
import { Center, Container, Text } from "@mantine/core";

const LostPage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [lostItems, setLostItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLostItems = async () => {
            try {
                const res = await axios.get('http://localhost:8080/lost')
                console.log(res.data);
                setLostItems(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error in fetching lost items");
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load lost items...")
                }
            } finally {
                setLoading(false);
            }
        }

        getLostItems();
    }, []);


    return (<div>
        {isRateLimited && <RateLimitedUI />}
        
        <div>
            {loading && <Center>Loading lost items...</Center>}
        </div>

    </div>);
};

export default LostPage;
