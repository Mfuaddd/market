import React, { useState } from 'react'

function useCounter(val = 0) {
    const [count, setCount] = useState(JSON.parse(localStorage.getItem("count")) || val)
    function inc() {
        localStorage.setItem("count",JSON.stringify(count+1))
        setCount(count+1)
    }
    function dec() {
        localStorage.setItem("count",JSON.stringify(count-1))
        setCount(count-1)
    }
    return [count,inc,dec]
}

export default useCounter