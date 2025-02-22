import { useState } from "react"

const useInput = () => {
    const [input, setInput] = useState({});

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };
    return {input,handleChange,setInput};
}

export default useInput;